'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { tmdbService } from '@/src/services/tmdb';
import { Genre, Movie } from '@/src/types/movie';
import MovieCard from '@/src/components/movie/MovieCard';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function GenresPage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const genresContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genresList = await tmdbService.getGenres();
        setGenres(genresList);
        if (genresList.length > 0) {
          setSelectedGenre(genresList[0]);
        }
      } catch (error) {
        console.error('Error loading genres:', error);
      }
    };

    loadGenres();
  }, []);

  useEffect(() => {
    const loadMovies = async () => {
      if (!selectedGenre) return;

      setIsLoading(true);
      try {
        const response = await tmdbService.getMoviesByGenre(selectedGenre.id);
        setMovies(response.results);
      } catch (error) {
        console.error('Error loading movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, [selectedGenre]);

  useEffect(() => {
    const checkScroll = () => {
      if (genresContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = genresContainerRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    const container = genresContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, [genres]);

  const scroll = (direction: 'left' | 'right') => {
    if (genresContainerRef.current) {
      const scrollAmount = 200;
      const container = genresContainerRef.current;
      const newScrollLeft = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen pt-32 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >

          <div className="relative group">
            {showLeftArrow && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-0 z-10 h-10 w-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                style={{ height: 'calc(100% - 16px)', transform: 'translateX(-50%)' }}
              >
                <ChevronLeftIcon className="w-6 h-6 text-white" />
              </button>
            )}

            <div 
              ref={genresContainerRef}
              className="flex items-center space-x-4 overflow-x-auto scrollbar-hide px-12"
              style={{ paddingBottom: '16px' }}
            >
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-6 py-2 rounded-full transition-colors whitespace-nowrap ${
                    selectedGenre?.id === genre.id
                      ? 'bg-white text-netflix-black'
                      : 'bg-netflix-dark text-white hover:bg-white/20'
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>

            {showRightArrow && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-0 z-10 h-10 w-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                style={{ height: 'calc(100% - 16px)', transform: 'translateX(50%)' }}
              >
                <ChevronRightIcon className="w-6 h-6 text-white" />
              </button>
            )}
          </div>


          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">
              Películas de {selectedGenre?.name}
            </h1>
          </div>


          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-12 h-12 border-4 border-netflix-red border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
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
              {movies.map((movie) => (
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
          )}
        </motion.div>
      </div>
    </div>
  );
}