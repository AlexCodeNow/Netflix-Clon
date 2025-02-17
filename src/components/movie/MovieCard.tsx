'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, HandThumbUpIcon, PlayIcon, PlusIcon } from '@heroicons/react/24/solid';
import { getImageUrl } from '@/src/services/tmdb';
import { Movie } from '@/src/types/movie';
import Link from 'next/link';
import { useFavoritesContext } from '@/src/hooks/useFavorites';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoritesContext();
  const isMovieFavorite = isFavorite(movie.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    isMovieFavorite ? removeFromFavorites(movie.id) : addToFavorites(movie);
  };

  return (
    <Link href={`/movie/${movie.id}`} className="relative block w-full">
      <div 
        className="relative aspect-[2/3]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 rounded-lg overflow-hidden">
          <Image
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            fill
            className="object-cover"
            priority={false}
          />
        </div>

        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0 bg-netflix-black/90 rounded-lg p-3 flex flex-col justify-start"
          >
            <h3 className="text-white text-sm font-bold mb-2">{movie.title}</h3>
            
            <div className="flex space-x-2 mb-4">
              <button className="p-1 bg-white rounded-full hover:bg-white/80">
                <PlayIcon className="w-4 h-4 text-netflix-black" />
              </button>
              <button 
                className={`p-1 rounded-full border transition-colors ${
                  isMovieFavorite ? 'bg-netflix-red border-netflix-red hover:bg-netflix-red/80' : 'bg-netflix-dark border-netflix-gray hover:border-white'
                }`}
                onClick={handleFavoriteClick}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMovieFavorite ? 'check' : 'plus'}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <PlusIcon className={`w-4 h-4 text-white ${isMovieFavorite ? 'rotate-45' : ''}`} />
                  </motion.div>
                </AnimatePresence>
              </button>
              <button className="p-1 bg-netflix-dark rounded-full border border-netflix-gray hover:border-white">
                <HandThumbUpIcon className="w-4 h-4 text-white" />
              </button>
              <button className="p-1 bg-netflix-dark rounded-full border border-netflix-gray hover:border-white">
                <ChevronDownIcon className="w-4 h-4 text-white" />
              </button>
            </div>
            
            <span className="text-green-500 text-xs font-semibold mb-4">{Math.round(movie.vote_average * 10)}% coincidencia</span>
            
            <p className="text-white/80 text-xs">
              {movie.overview}
            </p>
          </motion.div>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;