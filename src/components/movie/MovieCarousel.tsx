'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import Slider from 'react-slick';
import { Movie } from '@/src/types/movie';
import  MovieCard  from './MovieCard';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
}

const MovieCarousel = ({ title, movies }: MovieCarouselProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      }
    ]
  };

  return (
    <div 
      className="carousel-container relative mt-4 mb-4 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className="text-lg md:text-xl font-bold text-white mb-2 px-4 md:px-8">{title}</h2>
      
      <div className="relative">
        <button
          className={`carousel-arrow carousel-arrow-left absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => sliderRef.current?.slickPrev()}
        >
          <ChevronLeftIcon className="w-6 h-6 text-white" />
        </button>
        
        <button
          className={`carousel-arrow carousel-arrow-right absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => sliderRef.current?.slickNext()}
        >
          <ChevronRightIcon className="w-6 h-6 text-white" />
        </button>

        <div className="carousel-content px-4 md:px-8">
          <Slider ref={sliderRef} {...settings}>
            {movies.map((movie) => (
              <div key={movie.id} className="px-1">
                <MovieCard movie={movie} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default MovieCarousel;