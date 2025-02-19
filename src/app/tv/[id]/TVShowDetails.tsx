'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayIcon, PlusIcon, CheckIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { TVShowDetails, tmdbService, getImageUrl, Genre, TVShow, Video } from '@/src/services/tmdb';
import { Movie } from '@/src/types/movie';
import { useFavoritesContext } from '@/src/hooks/useFavorites';
import ContentCarousel from '@/src/components/recommendations/ContentCarousel';
import TrailerPlayer from '@/src/components/player/TrailerPlayer';

interface TVShowDetailsProps {
  showId: string;
}

export default function TVShowDetailsComponent({ showId }: TVShowDetailsProps) {
  const [show, setShow] = useState<TVShowDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<TVShow[]>([]);
  const [similarShows, setSimilarShows] = useState<TVShow[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoritesContext();

  useEffect(() => {
    const fetchShow = async () => {
      try {
        setIsLoading(true);
        const [showData, recommendationsData, similarData, videosData] = await Promise.all([
          tmdbService.getTVShowDetails(parseInt(showId)),
          tmdbService.getTVShowRecommendations(parseInt(showId)),
          tmdbService.getSimilarTVShows(parseInt(showId)),
          tmdbService.getTVShowVideos(parseInt(showId))
        ]);
        
        setShow(showData);
        setRecommendations(recommendationsData.results);
        setSimilarShows(similarData.results);
        setVideos(videosData);
      } catch (error) {
        console.error('Error fetching TV show details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShow();
  }, [showId]);

  const handleFavoriteClick = () => {
    if (!show) return;

    if (isFavorite(show.id)) {
      removeFromFavorites(show.id);
    } else {
      const movieFormat: Movie = {
        id: show.id,
        title: show.name,
        backdrop_path: show.backdrop_path,
        poster_path: show.poster_path,
        overview: show.overview,
        release_date: show.first_air_date,
        vote_average: show.vote_average,
        vote_count: show.vote_count,
        genre_ids: show.genres.map(g => g.id),
        popularity: show.popularity,
        adult: false,
        original_language: show.original_language,
        media_type: 'tv'
      };

      addToFavorites(movieFormat);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-netflix-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!show) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white/80">No se encontró la serie</p>
      </div>
    );
  }

  const isShowFavorite = isFavorite(show.id);

  return (
    <div className="content-wrapper">
    <div className="relative min-h-screen bg-netflix-black">
      <Link
        href="/series"
        className="absolute top-4 left-4 z-20 text-white hover:text-white/80 transition-colors"
      >
        <ChevronLeftIcon className="w-8 h-8" />
      </Link>

      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-netflix-black/80" />
        
        <Image
          src={getImageUrl(show.backdrop_path)}
          alt={show.name}
          fill
          priority
          className="object-cover opacity-60"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-netflix-black/80 via-netflix-black/60 to-netflix-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black/90 via-netflix-black/60 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative pt-20 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-8">

          <div className="relative aspect-[2/3] rounded-md overflow-hidden shadow-2xl">
            <Image
              src={getImageUrl(show.poster_path, 'w500')}
              alt={show.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="text-white space-y-4 p-6 bg-netflix-black/40 backdrop-blur-sm rounded-lg">
            <h1 className="text-4xl md:text-5xl font-bold">{show.name}</h1>
            
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-green-500 font-semibold">
                {Math.round(show.vote_average * 10)}% coincidencia
              </span>
              <span>{new Date(show.first_air_date).getFullYear()}</span>
              <span>{show.number_of_seasons} temporadas</span>
            </div>

            <div className="flex space-x-3">
              <button 
                onClick={() => videos.length > 0 && setIsTrailerPlaying(true)}
                className="flex items-center justify-center px-6 py-2 bg-white text-netflix-black font-semibold rounded hover:bg-white/90 transition"
                disabled={videos.length === 0}
              >
                <PlayIcon className="w-6 h-6 mr-2" />
                {videos.length > 0 ? 'Reproducir trailer' : 'No hay trailer disponible'}
              </button>
              <motion.button 
                className={`flex items-center justify-center px-6 py-2 font-semibold rounded transition-colors ${
                  isShowFavorite 
                    ? 'bg-netflix-red text-white hover:bg-netflix-red/80'
                    : 'bg-gray-500/70 text-white hover:bg-gray-500/50'
                }`}
                onClick={handleFavoriteClick}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isShowFavorite ? 'check' : 'plus'}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center"
                  >
                    {isShowFavorite ? (
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

            <p className="text-lg text-white/90 leading-relaxed">{show.overview}</p>

            <div className="pt-4 border-t border-white/20">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-white/60">Géneros: </span>
                  <span>{show.genres.map((g: Genre) => g.name).join(', ')}</span>
                </div>
                <div>
                  <span className="text-white/60">Estado: </span>
                  <span>{show.status}</span>
                </div>
                <div>
                  <span className="text-white/60">Red: </span>
                  <span>{show.networks?.[0]?.name || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-white/60">Tipo: </span>
                  <span>{show.type || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-8 pb-20">
        <div className="relative -mx-4 md:-mx-8">
          {recommendations.length > 0 && (
            <ContentCarousel
              title="Recomendaciones"
              items={recommendations}
              type="tv"
            />
          )}
          
          {similarShows.length > 0 && (
            <ContentCarousel
              title="Series similares"
              items={similarShows}
              type="tv"
            />
          )}
        </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isTrailerPlaying && videos.length > 0 && (
          <TrailerPlayer
            videoKey={videos[0].key}
            title={show.name}
            onClose={() => setIsTrailerPlaying(false)}
          />
        )}
      </AnimatePresence>
    </div>
    </div>
  );
}