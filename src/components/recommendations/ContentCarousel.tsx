'use client';

import { useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Slider from 'react-slick';
import { Movie } from '@/src/types/movie';
import { TVShow } from '@/src/services/tmdb';
import MovieCard from '../movie/MovieCard';
import TVShowCard from '../tv/TVShowCard';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ContentCarouselProps {
  title: string;
  items: (Movie | TVShow)[];
  type: 'movie' | 'tv';
}

export default function ContentCarousel({ title, items, type }: ContentCarouselProps) {
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: false,
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

  if (items.length === 0) return null;

  return (
    <div 
      className="group mt-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className="text-lg md:text-xl font-bold text-white mb-4 pl-4">{title}</h2>
      
      <div className="relative">
        {items.length > settings.slidesToShow && (
          <>
            <button
              className={`carousel-arrow absolute -left-4 top-0 z-20 h-full w-12 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={() => sliderRef.current?.slickPrev()}
            >
              <ChevronLeftIcon className="w-6 h-6 text-white" />
            </button>
            
            <button
              className={`carousel-arrow absolute -right-4 top-0 z-20 h-full w-12 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={() => sliderRef.current?.slickNext()}
            >
              <ChevronRightIcon className="w-6 h-6 text-white" />
            </button>
          </>
        )}

        <div className="px-4">
          <Slider ref={sliderRef} {...settings}>
            {items.map((item) => (
              <div key={item.id} className="px-1">
                {type === 'movie' ? (
                  <MovieCard movie={item as Movie} />
                ) : (
                  <TVShowCard show={item as TVShow} />
                )}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}