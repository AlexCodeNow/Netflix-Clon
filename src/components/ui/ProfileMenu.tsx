'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUpIcon, PencilIcon, UserIcon } from '@heroicons/react/24/outline';

interface Profile {
  id: number;
  name: string;
  imageUrl: string;
}

const profiles: Profile[] = [
  { id: 1, name: 'Usuario 1', imageUrl: '/images/default-profile.png' },
  { id: 2, name: 'Usuario 2', imageUrl: '/images/default-profile.png' },
  { id: 3, name: 'Niños', imageUrl: '/images/default-profile.png' },
];

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 cursor-pointer group"
      >
        <Image
          src="/images/default-profile.png"
          alt="Profile"
          width={32}
          height={32}
          className="rounded"
        />
        <ChevronUpIcon 
          className={`w-4 h-4 text-white transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-12 w-64 bg-netflix-black border border-white/10 rounded-md shadow-xl z-50"
          >

            <div className="p-2 border-b border-white/10">
              {profiles.map((profile) => (
                <button
                  key={profile.id}
                  className="flex items-center space-x-3 w-full p-2 hover:bg-white/10 rounded transition-colors"
                >
                  <Image
                    src={profile.imageUrl}
                    alt={profile.name}
                    width={32}
                    height={32}
                    className="rounded"
                  />
                  <span className="text-sm text-white">{profile.name}</span>
                </button>
              ))}
            </div>

            <div className="p-2 border-b border-white/10">
              <button className="flex items-center space-x-3 w-full p-2 hover:bg-white/10 rounded transition-colors">
                <PencilIcon className="w-5 h-5 text-white" />
                <span className="text-sm text-white">Administrar perfiles</span>
              </button>
            </div>

            <div className="p-2">
              <Link 
                href="/account" 
                className="flex items-center space-x-3 w-full p-2 hover:bg-white/10 rounded transition-colors"
              >
                <UserIcon className="w-5 h-5 text-white" />
                <span className="text-sm text-white">Cuenta</span>
              </Link>
              <button 
                onClick={() => {
                  // Alex acuerdate que aqui logica para cerrar sesion, porfa
                  setIsOpen(false);
                }}
                className="flex items-center space-x-3 w-full p-2 hover:bg-white/10 rounded transition-colors text-left"
              >
                <span className="text-sm text-white">Cerrar sesión</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileMenu;