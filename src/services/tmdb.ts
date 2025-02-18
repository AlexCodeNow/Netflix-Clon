import axios from 'axios';
import { Movie, MovieDetails } from '@/src/types/movie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_BASE_URL,
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    language: 'es-ES',
  },
});

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface GenresResponse {
  genres: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface TVShow {
  id: number;
  name: string;
  original_name: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  media_type?: string;
}

export interface TVShowResponse {
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
}

export interface TVShowDetails extends TVShow {
  genres: Genre[];
  number_of_seasons: number;
  number_of_episodes: number;
  episodes: number;
  seasons: number;
  status: string;
  tagline: string;
  type: string;
  networks: Network[];
  original_language: string;
}

export interface Network {
  id: number;
  name: string;
  logo_path: string;
}

export const tmdbService = {
  getFeaturedMovie: async (): Promise<Movie> => {
    const response = await api.get<MoviesResponse>('/trending/movie/day');
    return response.data.results[0];
  },

  getPopularMovies: async (page = 1): Promise<MoviesResponse> => {
    const response = await api.get<MoviesResponse>('/movie/popular', {
      params: { page },
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
      params: { page },
    });
    return response.data;
  },

  getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
    const response = await api.get<MovieDetails>(`/movie/${movieId}`);
    return response.data;
  },

  searchMovies: async (query: string, page = 1): Promise<MoviesResponse> => {
    const response = await api.get<MoviesResponse>('/search/movie', {
      params: { query, page },
    });
    return response.data;
  },

  getMoviesByGenre: async (genreId: number, page = 1): Promise<MoviesResponse> => {
    const response = await api.get<MoviesResponse>('/discover/movie', {
      params: {
        with_genres: genreId,
        page,
        sort_by: 'popularity.desc'
      }
    });
    return response.data;
  },

  getGenres: async (): Promise<Genre[]> => {
    const response = await api.get<GenresResponse>('/genre/movie/list');
    return response.data.genres;
  },


  getPopularTVShows: async (page = 1): Promise<TVShowResponse> => {
    const response = await api.get<TVShowResponse>('/tv/popular', {
      params: { page },
    });
    return response.data;
  },

  getTopRatedTVShows: async (page = 1): Promise<TVShowResponse> => {
    const response = await api.get<TVShowResponse>('/tv/top_rated', {
      params: { page },
    });
    return response.data;
  },

  getTrendingTVShows: async (page = 1): Promise<TVShowResponse> => {
    const response = await api.get<TVShowResponse>('/trending/tv/week', {
      params: { page },
    });
    return response.data;
  },

  getTVShowDetails: async (tvId: number): Promise<TVShowDetails> => {
    const response = await api.get<TVShowDetails>(`/tv/${tvId}`);
    return response.data;
  },

  getTVShowsByGenre: async (genreId: number, page = 1): Promise<TVShowResponse> => {
    const response = await api.get<TVShowResponse>('/discover/tv', {
      params: {
        with_genres: genreId,
        page,
        sort_by: 'popularity.desc'
      }
    });
    return response.data;
  },

  getTVGenres: async (): Promise<Genre[]> => {
    const response = await api.get<GenresResponse>('/genre/tv/list');
    return response.data.genres;
  },
};

export const getImageUrl = (path: string, size: string = 'original'): string => {
  return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/${size}${path}`;
};