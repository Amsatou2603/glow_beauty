'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useCartStore } from '@/lib/store';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  
  const setUserId = useCartStore((state) => state.setUserId);
  const syncWithSupabase = useCartStore((state) => state.syncWithSupabase);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setUserId(session?.user?.id ?? null);
      setLoading(false);
      
      if (event === 'SIGNED_IN') {
        syncWithSupabase();
      } else if (event === 'SIGNED_OUT') {
        clearCart();
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setUserId(session?.user?.id ?? null);
      setLoading(false);
      
      if (session?.user) {
        syncWithSupabase();
      }
    });

    return () => subscription.unsubscribe();
  }, [setUserId, syncWithSupabase, clearCart]);

  return (
    <AuthContext.Provider value={{ user, session, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
