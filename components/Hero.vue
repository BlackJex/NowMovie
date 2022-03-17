<template>
    <div class="h-96 relative">
        <img src="../assets/imgs/movieHero.jpg" class="w-full h-full object-cover">
        <div class="absolute z-10 inset-0 w-full h-full bg-black bg-opacity-60 flex items-center p-5">
            <div class="container mx-auto">
                <span class="text-red-600">
                    Now Streaming
                </span>
                <h1 class="text-6xl font-bold text-white">
                    Now<span class="font-thin">Movie</span>
                </h1>
                <a href="#movie-grid" class="block max-w-max bg-red-600 hover:bg-red-800 duration-300 rounded text-white px-4 py-2 mt-2">
                    View movies
                </a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Hero'
}
</script>