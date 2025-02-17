'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayIcon, PlusIcon, CheckIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { MovieDetails as MovieDetailsType } from '@/src/types/movie';
import { tmdbService, getImageUrl } from '@/src/services/tmdb';
import { useFavoritesContext } from '@/src/hooks/useFavorites';

interface MovieDetailsProps {
    movieId: string;
  }
  
  export default function MovieDetails({ movieId }: MovieDetailsProps) {
    const [movie, setMovie] = useState<MovieDetailsType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { addToFavorites, removeFromFavorites, isFavorite } = useFavoritesContext();
  
    useEffect(() => {
      const fetchMovie = async () => {
        try {
          setIsLoading(true);
          const movieData = await tmdbService.getMovieDetails(parseInt(movieId));
          setMovie(movieData);
        } catch (error) {
          console.error('Error fetching movie details:', error);
        } finally {
          setIsLoading(false);
        }
      };
  
      if (movieId) {
        fetchMovie();
      }
    }, [movieId]);
  
    const handleFavoriteClick = () => {
      if (!movie) return;
      
      if (isFavorite(movie.id)) {
        removeFromFavorites(movie.id);
      } else {
        addToFavorites(movie);
      }
    };
  
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-12 h-12 border-4 border-netflix-red border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }
  
    if (!movie) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-white/80">No se encontró la película</p>
        </div>
      );
    }
  
    const isMovieFavorite = isFavorite(movie.id);
  
    return (
      <div className="relative min-h-screen bg-netflix-black">

        <Link
          href="/"
          className="absolute top-4 left-4 z-20 text-white hover:text-white/80 transition-colors"
        >
          <ChevronLeftIcon className="w-8 h-8" />
        </Link>

        <div className="absolute inset-0">
          <Image
            src={getImageUrl(movie.backdrop_path)}
            alt={movie.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-netflix-black/60 via-netflix-black/40 to-netflix-black" />
        </div>
  

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative pt-20 px-4 md:px-8 max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-8">

            <div className="relative aspect-[2/3] rounded-md overflow-hidden shadow-2xl">
              <Image
                src={getImageUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>
  
            <div className="text-white space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">{movie.title}</h1>
              
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-green-500 font-semibold">
                  {Math.round(movie.vote_average * 10)}% coincidencia
                </span>
                <span>{new Date(movie.release_date).getFullYear()}</span>
                <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
              </div>
  
              <div className="flex space-x-3">
                <button className="flex items-center justify-center px-6 py-2 bg-white text-netflix-black font-semibold rounded hover:bg-white/90 transition">
                  <PlayIcon className="w-6 h-6 mr-2" />
                  Reproducir
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
                          Añadir a Mi Lista
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
                <button className="flex items-center justify-center px-6 py-2 bg-gray-500/70 text-white font-semibold rounded hover:bg-gray-500/50 transition">
                  <HandThumbUpIcon className="w-6 h-6" />
                </button>
              </div>
  
              <p className="text-lg text-white/90 leading-relaxed">{movie.overview}</p>
  
              <div className="pt-4 border-t border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-white/60">Géneros: </span>
                    <span>{movie.genres.map(g => g.name).join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-white/60">Idioma original: </span>
                    <span>{movie.original_language.toUpperCase()}</span>
                  </div>
                  <div>
                    <span className="text-white/60">Puntuación total: </span>
                    <span>{movie.vote_average.toFixed(1)} ({movie.vote_count} votos)</span>
                  </div>
                  <div>
                    <span className="text-white/60">Estado: </span>
                    <span>{movie.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }