'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { InformationCircleIcon, PlayIcon } from '@heroicons/react/24/solid';
import { getImageUrl } from '@/src/services/tmdb';
import { Movie } from '@/src/types/movie';


interface HeroProps {
    movie: Movie;
}


const Hero = ({ movie }: HeroProps) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [movie]);

    if(!movie) return null;

    return (
        <motion.div
            className='relative h-[85vh] w-full'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >

        <div>
            <Image 
                src={getImageUrl(movie.backdrop_path)}
                alt={movie.title}
                fill
                priority
                className='object-cover'
                onLoad={() => setIsLoading(false)}
            />
            <div className='absolute inset-0 bg-gradient-to-r from-netflix-black/80 via-netflix-black/50 to-transparent' />
            <div className='absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent' />
        </div>

        <motion.div
            className='relative h-full flex items-center px-4 sm:px-8 lg:px-16'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
        >
            <div className='w-full max-w-2xl space-y-4'>
                <motion.h1
                    className='text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg'
                    initial={{ opacity: 0, y: 20 }}
                    animate= {{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    {movie.title}
                </motion.h1>

                <motion.p
                    className='text-lg text-white/90 line-clamp-3 drop-shadow-lg'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                >
                    {movie.overview}
                </motion.p>


                <motion.div
                    className='flex space-x-3 pt-4'
                    initial= {{ opacity: 0 }}
                    animate= {{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                >
                    <button className='flex items-center justify-center px-6 py-2 bg-white text-netflix-black font-semibold rounded hover:bg-white/90 transition'>
                        <PlayIcon className='w-6 h-6 mr-2' />
                        Reproducir
                    </button>
                    <button className='flex items-center justify-center px-6 py-2 bg-gray-500/70 text-white font-semibold rounded hover:bg-gray-500/50 transition'>
                        <InformationCircleIcon className='w-6 h-6 mr-2' />
                        Más información
                    </button>
                </motion.div>
            </div>
        </motion.div>


        {isLoading && (
            <div className='absolute inset-0 bg-netflix-black flex items-center justify-center'>
                <div className='w-12 h-12 border-4 border-netflix-red border-t-transparent rounded-full animate-spin' />
            </div>
        )}
        </motion.div>
    );
};

export default Hero;