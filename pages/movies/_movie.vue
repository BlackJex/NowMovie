<template>
    <!-- Loader -->
    <div class="min-h-screen flex items-center justify-center">
        <div v-if="$fetchState.pending" class="flex w-full items-center justify-center">
        <div class="h-28 w-28 rounded-50 border-y border-red-500 animate-spin"></div>
        </div>
        <div v-else class="container mx-auto p-3 flex flex-col space-y-8">
            <div class="w-full xl:max-w-6xl mx-auto xl:px-3">
                <NuxtLink :to="`/`" class="block max-w-max text-white p-1 rounded-md bg-red-600 hover:bg-red-800 duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" class="w-5 fill-current"><path d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z"/></svg>
            </NuxtLink>
            </div>
            <div class="max-w-xs sm:max-w-xl xl:max-w-6xl grid grid-cols-1 mx-auto sm:grid-cols-2 gap-8">
                <div class="w-full flex items-center justify-center xl:max-w-sm rounded-md mx-auto">
                    <img 
                        :src="`//image.tmdb.org/t/p/w500${movie.poster_path}`"  
                        class="w-full rounded-md mx-auto">
                </div>
                <div class="w-full flex flex-col space-y-2">
                    <h1 class="text-white text-4xl lg:text-5xl">
                        Title: {{ movie.title }}
                    </h1>
                    <p class="text-white text-xl">
                        <span class="underline">Tagline:</span> "{{ movie.tagline }}"
                    </p>
                    <p class="text-white text-xl">
                        <span class="underline">Released:</span>
                        {{
                        new Date(movie.release_date).toLocaleString('en-us', {
                            month:'long',
                            day: 'numeric',
                            year: 'numeric'
                        })
                        }}
                    </p>
                    <p class="text-white text-xl">
                        <span class="underline">Duration:</span> {{ movie.runtime }} minutes
                    </p>
                    <p class="text-white text-xl">
                        <span class="underline">Revenue:</span> 
                        {{ 
                            movie.revenue.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            })
                        }}
                    </p>
                    <p class="text-white text-xl">
                        <span class="underline">Overview:</span> {{ movie.overview }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as tmdb from '../../clients/TMDBService.js';
export default {
    name: 'MovieShow',
    data()
    {
        return {
            movie: '',
        }
    },
    async fetch()
    {
        await this.getMovie();
    },
    fetchDelay: 1000,
    head()
    {
        return {
            title: this.movie.title
        }
    },
    methods:
    {
        async getMovie()
        {
            const res = await tmdb.getMovie(this.$route.params.movie);
            this.movie = res.data;
        }
    }
}
</script>