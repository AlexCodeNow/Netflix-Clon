'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDownIcon, HandThumbUpIcon, PlayIcon, PlusIcon } from '@heroicons/react/24/solid';
import { getImageUrl } from '@/src/services/tmdb';
import { Movie } from '@/src/types/movie';
import Link from 'next/link';


interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      href={`/movie/${movie.id}`}
      className="relative group aspect-[2/3] w-full block"
      onClick={(e) => {
        if (!movie.id) {
          e.preventDefault();
          console.error('No movie ID available');
        }
      }}
    >
      <div 
        className="relative h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        <div className="absolute inset-0 rounded-md overflow-hidden">
          <Image
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            fill
            sizes="(max-width: 640px) 150px, 200px"
            className="movie-card-image"
            priority={false}
          />
        </div>

        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0 bg-netflix-black/80 rounded-md p-2 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-white text-sm font-semibold line-clamp-2">{movie.title}</h3>
              <div className="flex space-x-1 mt-2">
                <button 
                  className="p-1 bg-white rounded-full hover:bg-white/80"
                  onClick={(e) => e.preventDefault()}
                >
                  <PlayIcon className="w-3 h-3 text-netflix-black" />
                </button>
                <button 
                  className="p-1 bg-netflix-dark rounded-full border border-netflix-gray hover:border-white"
                  onClick={(e) => e.preventDefault()}
                >
                  <PlusIcon className="w-3 h-3 text-white" />
                </button>
                <button 
                  className="p-1 bg-netflix-dark rounded-full border border-netflix-gray hover:border-white"
                  onClick={(e) => e.preventDefault()}
                >
                  <HandThumbUpIcon className="w-3 h-3 text-white" />
                </button>
                <button 
                  className="p-1 bg-netflix-dark rounded-full border border-netflix-gray hover:border-white ml-auto"
                  onClick={(e) => e.preventDefault()}
                >
                  <ChevronDownIcon className="w-3 h-3 text-white" />
                </button>
              </div>
            </div>

            <div className="text-[10px] text-white/80">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-green-500 font-semibold">
                  {Math.round(movie.vote_average * 10)}% coincidencia
                </span>
              </div>
              <p className="line-clamp-2">{movie.overview}</p>
            </div>
          </motion.div>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;