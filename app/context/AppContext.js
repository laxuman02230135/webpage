'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize from localStorage
      const storedCart = localStorage.getItem('cart');
      const storedUser = localStorage.getItem('user');
      const storedLoginState = localStorage.getItem('isLoggedIn');

      if (storedCart) setCart(JSON.parse(storedCart));
      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedLoginState) setIsLoggedIn(JSON.parse(storedLoginState));
      setIsInitialized(true);
    }
  }, []);

  const value = {
    cart,
    setCart,
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    isInitialized
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 