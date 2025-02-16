import { create } from 'zustand';
import { Movie, MovieDetails } from '../types/movie';

interface MoviesState {
    featuredMovie: Movie | null;
    popularMovies: Movie[];
    topRatedMovies: Movie[];
    upcomingMovies: Movie[];
    favorites: Movie[];
    isLoading: boolean;
    error: string | null;
    setFeaturedMovie: (movie: Movie) => void;
    setPopularMovies: (movies: Movie[]) => void;
    setTopRatedMovies: (movies: Movie[]) => void;
    setUpcomingMovies: (movies: Movie[]) => void;
    addToFavorites: (movie: Movie) => void;
    removeFromFavorites: (movieId: number) => void;
    setIsLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useMoviesStore = create<MoviesState>((set) => ({
    featuredMovie: null,
    popularMovies: [],
    topRatedMovies: [],
    upcomingMovies: [],
    favorites: [],
    isLoading: false,
    error: null,

    setFeaturedMovie: (movie) => set({ featuredMovie: movie }),
    setPopularMovies: (movies) => set({ popularMovies: movies }),
    setTopRatedMovies: (movies) => set({ topRatedMovies: movies }),
    setUpcomingMovies: (movies) => set({ upcomingMovies: movies }),

    addToFavorites: (movie) =>
        set((state) => ({
            favorites: [...state.favorites, movie]
        })),

    removeFromFavorites: (movieId) =>
        set((state) => ({
            favorites: state.favorites.filter((movie) => movie.id !== movieId)
        })),

    setIsLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}));