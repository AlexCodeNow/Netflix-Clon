'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, FireIcon } from '@heroicons/react/24/outline';
import { Movie } from '@/src/types/movie';
import { tmdbService } from '@/src/services/tmdb';
import MovieCard from '@/src/components/movie/MovieCard';

export default function NewReleasesPage() {
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'trending'>('upcoming');

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      try {
        const [upcomingResponse, trendingResponse] = await Promise.all([
          tmdbService.getUpcomingMovies(),
          tmdbService.getFeaturedMovie().then(movie => tmdbService.getMoviesByGenre(movie.genre_ids[0]))
        ]);

        setUpcomingMovies(upcomingResponse.results);
        setTrendingMovies(trendingResponse.results);
      } catch (error) {
        console.error('Error loading movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, []);

  const currentMovies = activeTab === 'upcoming' ? upcomingMovies : trendingMovies;

  return (
    <div className="min-h-screen pt-32 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex space-x-4 border-b border-white/10">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex items-center space-x-2 px-6 py-3 text-lg font-medium transition-colors ${
                activeTab === 'upcoming'
                  ? 'text-white border-b-2 border-netflix-red'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <CalendarIcon className="w-5 h-5" />
              <span>Próximos estrenos</span>
            </button>
            <button
              onClick={() => setActiveTab('trending')}
              className={`flex items-center space-x-2 px-6 py-3 text-lg font-medium transition-colors ${
                activeTab === 'trending'
                  ? 'text-white border-b-2 border-netflix-red'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <FireIcon className="w-5 h-5" />
              <span>Tendencias</span>
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-12 h-12 border-4 border-netflix-red border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <p className="text-white/70 text-lg">
                {activeTab === 'upcoming'
                  ? 'Las películas más esperadas que llegarán próximamente a Netflix.'
                  : 'Las películas más populares del momento en Netflix.'}
              </p>

              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                animate="show"
              >
                {currentMovies.map((movie) => (
                  <motion.div
                    key={movie.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 }
                    }}
                  >
                    <MovieCard movie={movie} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}