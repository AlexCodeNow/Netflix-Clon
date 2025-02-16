'use client';

import Hero from '../components/home/Hero';
import { useMovies } from '../hooks/useMovies';


export default function HomePage() {
  const { featuredMovie, isLoading, error } = useMovies();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 border-4 border-netflix-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white/80">{error}</p>
      </div>
    );
  }

  return (
    <div className="">
      {featuredMovie && <Hero movie={featuredMovie} />}
      {/* No te olvides de los carruseles alex por jesucristo bendito */}
    </div>
  );
}