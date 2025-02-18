'use client';

import { useState, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={searchContainerRef}>
      <button
        onClick={() => setIsOpen(true)}
        className={`flex items-center justify-center text-white hover:text-gray-300 transition-all duration-200 ${
          isOpen ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <MagnifyingGlassIcon className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.form
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center bg-[#141414] border border-white/20"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center flex-1">
              <MagnifyingGlassIcon className="w-6 h-6 text-white/50 ml-3" />
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Títulos, personas, géneros"
                className="w-full px-4 py-1.5 bg-transparent text-white placeholder-white/50 focus:outline-none text-base"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-2 text-white/50 hover:text-white transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;