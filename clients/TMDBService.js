
import axios from 'axios';


export const TMDBClient = axios.create({ 
    baseURL: `https://${process.env.tmdbBaseUrl}/3/`,
});


export const nowPlayingMovies = async () => 
{
    const res = await TMDBClient.get(`movie/now_playing?api_key=${process.env.NUXT_ENV_TMDB_API_V3}&language=en-US&page=1`);
    return res;
};

export const searchMovies = async (query) => 
{
    const res = await TMDBClient.get(`search/movie?api_key=${process.env.NUXT_ENV_TMDB_API_V3}&language=en-US&page=1&query=${query}`);
    return res;
};

export const getMovie = async (movie) => 
{
    const res = await TMDBClient.get(`movie/${movie}?api_key=${process.env.NUXT_ENV_TMDB_API_V3}&language=en-US`);
    return res;
};