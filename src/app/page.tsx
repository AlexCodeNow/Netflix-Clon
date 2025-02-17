'use client';


import Hero from '../components/home/Hero';
import MovieCarousel from '../components/movie/MovieCarousel';
import { useMovies } from '../hooks/useMovies';
import { useFavoritesContext } from '../hooks/useFavorites';

export default function HomePage() {
  const { 
    featuredMovie, 
    popularMovies, 
    topRatedMovies, 
    upcomingMovies,
    isLoading, 
    error 
  } = useMovies();

  const { favorites, isLoading: favoritesLoading } = useFavoritesContext();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-netflix-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white/80">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {featuredMovie && <Hero movie={featuredMovie} />}
      
      <div className="relative z-10 mt-[-150px]">
        {!favoritesLoading && favorites.length > 0 && (
          <MovieCarousel
            title="Mi Lista"
            movies={favorites}
          />
        )}

        {popularMovies.length > 0 && (
          <MovieCarousel
            title="Populares en Netflix"
            movies={popularMovies}
          />
        )}

        {topRatedMovies.length > 0 && (
          <MovieCarousel
            title="Mejor valoradas"
            movies={topRatedMovies}
          />
        )}

        {upcomingMovies.length > 0 && (
          <MovieCarousel
            title="Próximos estrenos"
            movies={upcomingMovies}
          />
        )}
      </div>
    </div>
  );
}