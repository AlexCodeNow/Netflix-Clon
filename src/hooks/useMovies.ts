import { useEffect } from 'react';
import { useMoviesStore } from '../store/movies';
import { tmdbService } from '../services/tmdb';

export const useMovies = () => {
    const {
        setFeaturedMovie,
        setPopularMovies,
        setTopRatedMovies,
        setUpcomingMovies,
        setIsLoading,
        setError,
    } = useMoviesStore();

    const loadInitialData = async () => {
        try {
            setIsLoading(true);
            setError(null);


            const [
                featuredMovie,
                popularMoviesResponse,
                topRatedMoviesResponse,
                upcomingMoviesResponse,
            ] = await Promise.all ([
                tmdbService.getFeaturedMovie(),
                tmdbService.getPopularMovies(),
                tmdbService.getTopRatedMovies(),
                tmdbService.getUpcomingMovies(),
            ]);

            setFeaturedMovie(featuredMovie);
            setPopularMovies(popularMoviesResponse.results);
            setTopRatedMovies(topRatedMoviesResponse.results);
            setUpcomingMovies(upcomingMoviesResponse.results);
        } catch (error) {
            setError('Error al cargar las películas. Por favor, intenta de nuevo más tarde.');
            console.error('Error loading movies:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadInitialData();
    }, []);

    return {
        ...useMoviesStore(),
        reloadData: loadInitialData,
    };
};
