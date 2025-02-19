'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { InformationCircleIcon, PlayIcon, PlusIcon, CheckIcon } from '@heroicons/react/24/solid';
import { getImageUrl, tmdbService, Video } from '@/src/services/tmdb';
import { Movie } from '@/src/types/movie';
import { useFavoritesContext } from '@/src/hooks/useFavorites';
import TrailerPlayer from '@/src/components/player/TrailerPlayer';

interface HeroProps {
  movie: Movie;
}

const Hero = ({ movie }: HeroProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoritesContext();
  const router = useRouter();
  const isMovieFavorite = isFavorite(movie.id);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [movie]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videosData = await tmdbService.getMovieVideos(movie.id);
        setVideos(videosData);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [movie.id]);

  const handleFavoriteClick = () => {
    if (isMovieFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const handlePlayClick = () => {
    if (videos.length > 0) {
      setIsTrailerPlaying(true);
    }
  };

  const handleMoreInfoClick = () => {
    router.push(`/movie/${movie.id}`);
  };

  if (!movie) return null;

  return (
    <motion.div 
      className="relative h-[85vh] w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute top-0 left-0 h-full w-full">
        <Image
          src={getImageUrl(movie.backdrop_path)}
          alt={movie.title}
          fill
          priority
          className="object-cover"
          onLoad={() => setIsLoading(false)}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black/80 via-netflix-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
      </div>

      <motion.div 
        className="relative h-full flex items-center px-4 sm:px-8 lg:px-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="w-full max-w-2xl space-y-4">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {movie.title}
          </motion.h1>

          <motion.p 
            className="text-lg text-white/90 line-clamp-3 drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            {movie.overview}
          </motion.p>

          <motion.div 
            className="flex space-x-3 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <button 
              onClick={handlePlayClick}
              disabled={videos.length === 0}
              className="flex items-center justify-center px-6 py-2 bg-white text-netflix-black font-semibold rounded hover:bg-white/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PlayIcon className="w-6 h-6 mr-2" />
              {videos.length > 0 ? 'Reproducir' : 'No disponible'}
            </button>
            <motion.button 
              className={`flex items-center justify-center px-6 py-2 font-semibold rounded transition-colors ${
                isMovieFavorite 
                  ? 'bg-netflix-red text-white hover:bg-netflix-red/80'
                  : 'bg-gray-500/70 text-white hover:bg-gray-500/50'
              }`}
              onClick={handleFavoriteClick}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMovieFavorite ? 'check' : 'plus'}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center"
                >
                  {isMovieFavorite ? (
                    <>
                      <CheckIcon className="w-6 h-6 mr-2" />
                      En Mi Lista
                    </>
                  ) : (
                    <>
                      <PlusIcon className="w-6 h-6 mr-2" />
                      Mi Lista
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
            <button 
              onClick={handleMoreInfoClick}
              className="flex items-center justify-center px-6 py-2 bg-gray-500/70 text-white font-semibold rounded hover:bg-gray-500/50 transition"
            >
              <InformationCircleIcon className="w-6 h-6 mr-2" />
              Más información
            </button>
          </motion.div>
        </div>
      </motion.div>

      {isLoading && (
        <div className="absolute inset-0 bg-netflix-black flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-netflix-red border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <AnimatePresence>
        {isTrailerPlaying && videos.length > 0 && (
          <TrailerPlayer
            videoKey={videos[0].key}
            title={movie.title}
            onClose={() => setIsTrailerPlaying(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Hero;