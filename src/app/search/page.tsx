'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Movie } from '@/src/types/movie';
import { tmdbService } from '@/src/services/tmdb';
import MovieCard from '@/src/components/movie/MovieCard';
import { motion } from 'framer-motion';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchMovies = async () => {
      if (!query) return;

      try {
        setIsLoading(true);
        setError(null);
        const response = await tmdbService.searchMovies(query);
        setMovies(response.results);
      } catch (err) {
        setError('Error al buscar películas. Por favor, intenta de nuevo.');
        console.error('Error searching movies:', err);
      } finally {
        setIsLoading(false);
      }
    };

    searchMovies();
  }, [query]);

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

  if (!query) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white/80">Ingresa un término de búsqueda</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-8">
        {movies.length > 0 
          ? `Resultados para "${query}"`
          : `No se encontraron resultados para "${query}"`
        }
      </h1>

      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {movies.map((movie) => (
          <div key={movie.id} className="aspect-[2/3]">
            <MovieCard movie={movie} />
          </div>
        ))}
      </motion.div>

      {movies.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-white/60">
            Intenta con otros términos o verifica tu búsqueda
          </p>
        </div>
      )}
    </div>
  );
}