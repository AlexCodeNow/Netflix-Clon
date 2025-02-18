'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayIcon, PlusIcon, HandThumbUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { getImageUrl } from '@/src/services/tmdb';
import { TVShow } from '@/src/services/tmdb';
import { useFavoritesContext } from '@/src/hooks/useFavorites';

interface TVShowCardProps {
  show: TVShow;
}

const TVShowCard = ({ show }: TVShowCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoritesContext();
  const isShowFavorite = isFavorite(show.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    isShowFavorite ? removeFromFavorites(show.id) : addToFavorites(show as any); // alex, esto es temporal, mirame tu no eres asi
  };

  return (
    <Link href={`/tv/${show.id}`} className="relative block w-full">
      <div 
        className="relative aspect-[2/3]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 rounded-lg overflow-hidden">
          <Image
            src={getImageUrl(show.poster_path, 'w500')}
            alt={show.name}
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
            <h3 className="text-white text-sm font-bold mb-2">{show.name}</h3>
            
            <div className="flex space-x-2 mb-4">
              <button className="p-1 bg-white rounded-full hover:bg-white/80">
                <PlayIcon className="w-4 h-4 text-netflix-black" />
              </button>
              <button 
                className={`p-1 rounded-full border transition-colors ${
                  isShowFavorite ? 'bg-netflix-red border-netflix-red hover:bg-netflix-red/80' : 'bg-netflix-dark border-netflix-gray hover:border-white'
                }`}
                onClick={handleFavoriteClick}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isShowFavorite ? 'check' : 'plus'}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <PlusIcon className={`w-4 h-4 text-white ${isShowFavorite ? 'rotate-45' : ''}`} />
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
            
            <span className="text-green-500 text-xs font-semibold mb-4">{Math.round(show.vote_average * 10)}% coincidencia</span>
            
            <p className="text-white/80 text-xs line-clamp-4">
              {show.overview}
            </p>
          </motion.div>
        )}
      </div>
    </Link>
  );
};

export default TVShowCard;