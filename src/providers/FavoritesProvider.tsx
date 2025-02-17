'use client';

import { ReactNode } from 'react';
import { FavoritesContext, useFavorites } from '@/src/hooks/useFavorites';

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const favoritesData = useFavorites();

  return (
    <FavoritesContext.Provider value={favoritesData}>
      {children}
    </FavoritesContext.Provider>
  );
};