'use client';

import { motion } from 'framer-motion';
import MovieCard from '@/src/components/movie/MovieCard';
import { useFavoritesContext } from '@/src/hooks/useFavorites';
import { BookmarkIcon } from '@heroicons/react/24/outline';

export default function ListPage() {
  const { favorites, isLoading } = useFavoritesContext();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-netflix-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">Mi Lista</h1>
            <span className="text-white/60 text-lg">
              {favorites.length} {favorites.length === 1 ? 'título' : 'títulos'}
            </span>
          </div>

          {favorites.length > 0 ? (
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
              {favorites.map((movie) => (
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
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center space-y-4 py-20"
            >
              <BookmarkIcon className="w-20 h-20 text-white/20" />
              <h2 className="text-xl text-white/90 font-medium">Tu lista está vacía</h2>
              <p className="text-white/60 text-center max-w-md">
                Agrega películas y series a tu lista para verlas cuando quieras. 
                Solo busca el icono + en cualquier título.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}