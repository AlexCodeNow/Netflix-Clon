'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface TrailerPlayerProps {
  videoKey: string;
  title: string;
  onClose: () => void;
}

export default function TrailerPlayer({ videoKey, title, onClose }: TrailerPlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
    >
      <div className="absolute top-4 left-4 text-white text-2xl font-bold z-10">
        {title}
      </div>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors z-10"
      >
        <XMarkIcon className="w-8 h-8" />
      </button>

      <div ref={playerRef} className="relative w-full h-full max-w-7xl max-h-[80vh] mx-auto">
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&modestbranding=1&rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </motion.div>
  );
}