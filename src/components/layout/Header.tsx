'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BellIcon } from '@heroicons/react/24/outline';
import SearchBar from '../ui/SearchBar';
import ProfileMenu from '../ui/ProfileMenu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 z-50 w-full px-4 py-4 transition-all duration-500 ${
        isScrolled ? "bg-netflix-black" : "bg-transparent"
      }`}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <Link href="/">
            <Image
              src="/images/netflix-logo.png"
              alt="Netflix"
              width={32}
              height={16}
              className="cursor-pointer"
            />
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="text-base text-white hover:text-gray-300">
              Inicio
            </Link>
            <Link
              href="/series"
              className="text-base text-white hover:text-gray-300"
            >
              Series
            </Link>
            <Link
              href="/genres"
              className="text-base text-white hover:text-gray-300"
            >
              Películas
            </Link>
            <Link
              href="/new"
              className="text-base text-white hover:text-gray-300"
            >
              Novedades
            </Link>
            <Link
              href="/list"
              className="text-base text-white hover:text-gray-300"
            >
              Mi lista
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-6">
          <SearchBar />
          <button className="text-white hover:text-gray-300">
            <BellIcon className="w-6 h-6" />
          </button>
          <ProfileMenu />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;