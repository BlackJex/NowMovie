<template>
  <div class="">
    <!-- Hero -->
    <Hero/>

    <!-- Search -->
    <div class="container mx-auto p-5">
      <div class="relative max-w-max">
        <input 
          v-model="search_input"
          type="text" placeholder="Search movie..."
          class="pl-4 pr-10 h-12 rounded-md border border-zinc-800 hover:border-red-600 duration-300 focus:ring focus:ring-red-600">
        <button 
          v-show="search_input.length"
          class="absolute right-0 inset-y-0 px-3 flex items-center justify-center text-zinc-400 hover:text-red-600 duration-300"
          @click.prevent="search_input = ''">
          
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 fill-current"><path d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/></svg>
        </button>
      </div>
    </div>
    <!-- Loader -->
    <div v-if="$fetchState.pending" class="flex w-full items-center justify-center">
      <div class="h-28 w-28 rounded-50 border-y border-red-500 animate-spin"></div>
    </div>
    <!-- Movies -->
    <div v-else class="container mx-auto p-10">
      <div id="movie-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div v-for="(movie, index) in movies" :key="index" class="flex flex-col items-center justify-center">
          <div>
            <div class="h-96 relative rounded">
              <img 
                :src="`//image.tmdb.org/t/p/w500${movie.poster_path}`" 
                class="h-full rounded-md" />
                <div class="absolute inset-0 bg-black bg-opacity-70 flex flex-col space-y-1 items-center justify-end px-2 py-7 opacity-0 hover:opacity-100 duration-300 rounded-md"> 
                  <p class="text-left text-white text-sm">
                    {{ movie.overview }}
                  </p>
                </div>
                <p class="absolute top-0 left-0 bg-red-600 text-white text-lg font-bold h-10 w-10 flex items-center justify-center rounded-br-xl rounded-tl-md">
                  {{ movie.vote_average }}
                </p>
            </div>
            <div>
              <p class="text-left text-white text-xl">
                {{ movie.title.slice(0, 20) }} <span v-show="movie.title.length > 20">...</span>
              </p>
              <p class="text-left text-white font-thin">
                Released:
                {{
                  new Date(movie.release_date).toLocaleString('en-us', {
                    month:'long',
                    day: 'numeric',
                    year: 'numeric'
                  })
                }}
              </p>
              <NuxtLink 
                class="block px-2 py-1 text-sm rounded bg-red-600 hover:bg-red-800 duration-300 text-white max-w-max"
                :to="`/movies/${movie.id}`">
                Details
              </NuxtLink>
            </div>
           
          </div>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
import * as tmdb from '../clients/TMDBService.js';
export default {
  name: 'Welcome',
  data()
  {
    return {
      movies: [],
      search_input: '',
      timer: undefined
    }
  },
  async fetch()
  {
    if(!this.search_input)
    {
      await this.getMovies()
    }
    else 
    {
      await this.searchMovie()
    }
  },
  fetchDelay: 1000,
  head()
  {
    return {
      title: 'NowMovie - Latest Streaming Movie Info',
      meta:
      [
        {
          hid:'description',
          name:'description',
          content: 'Get all the latest streaming movies in theaters & online'
        },
        {
          hid:'keywords',
          name:'keywords',
          content: 'movies, stream, streaming'
        }
      ]
    }
  },
  watch:
  {
    search_input()
    {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$fetch();
      }, 1000)
    }
  },
  methods:
  {   
    async getMovies()
    {
      const res = await tmdb.nowPlayingMovies();
      this.movies = res.data.results;
    },
    async searchMovie()
    {
      const res = await tmdb.searchMovies(this.search_input);
      this.movies = res.data.results;
    }
  }
}
</script>
