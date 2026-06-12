'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface User {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  role: 'user' | 'admin';
  phone?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function DjangoAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      setToken(storedToken);
      // Fetch user profile
      api.getProfile(storedToken).then(data => {
        if (!data.error) {
          setUser(data);
        } else {
          localStorage.removeItem('auth_token');
          setToken(null);
        }
        setLoading(false);
      }).catch(() => {
        localStorage.removeItem('auth_token');
        setToken(null);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const result = await api.login(email, password);
    if (result.error) {
      throw new Error(result.error);
    }
    setToken(result.token);
    setUser(result.user);
    localStorage.setItem('auth_token', result.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useDjangoAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useDjangoAuth must be used within a DjangoAuthProvider');
  }
  return context;
}
