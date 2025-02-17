import axios from 'axios';
import { Movie, MovieDetails, MoviesResponse } from '../types/movie';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_TMDB_BASE_URL,
    params: {
        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
        language: 'es-ES',
    },
});

export const tmdbService = {
    getFeaturedMovie: async (): Promise<Movie> => {
        const response = await api.get<MoviesResponse>('/trending/movie/day');
        return response.data.results[0];
    },

    getPopularMovies: async (page = 1): Promise<MoviesResponse> => {
        const response = await api.get<MoviesResponse>('/movie/popular', {
            params: {page},
        });
        return response.data;
    },


    getTopRatedMovies: async (page = 1): Promise<MoviesResponse> => {
        const response = await api.get<MoviesResponse>('/movie/top_rated', {
            params: { page },
        });
        return response.data;
    },


    getUpcomingMovies: async (page = 1): Promise<MoviesResponse> => {
        const response = await api.get<MoviesResponse>('/movie/upcoming', {
            params: {page},
        });
        return response.data;
    },


    getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
        try {
          const response = await api.get<MovieDetails>(`/movie/${movieId}`);
          return response.data;
        } catch (error) {
          console.error('Error fetching movie details:', error);
          throw error;
        }
      },


    searchMovies: async (query: string, page = 1): Promise<MoviesResponse> => {
        const response = await api.get<MoviesResponse>('/search/movie', {
            params: {query, page},
        });
        return response.data;
    },


    getMoviesByGenre: async (genreId: number, page = 1): Promise<MoviesResponse> => {
        const response = await api.get<MoviesResponse>('/discover/movie', {
            params: {
                with_genres: genreId,
                page,
            },
        });
        return response.data;
    },
};


export const getImageUrl = (path: string, size: string = 'original'): string => {
    return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/${size}${path}`;
};