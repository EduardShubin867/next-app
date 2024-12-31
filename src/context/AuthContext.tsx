'use client';
import { useSession } from 'next-auth/react';
import React, { createContext, useContext, useEffect, useState } from 'react';

type User = {
  id: string;
  name: string;
};

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

interface AuthContextProps extends AuthState {
  signIn: typeof signIn;
  signOut: typeof signOut;
}

const defaultAuthState: AuthContextProps = {
  isAuthenticated: false,
  user: null,
  loading: true,
  signIn,
  signOut,
};

const AuthContext = createContext<AuthContextProps>(defaultAuthState);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  useEffect(() => {
    if (status === 'loading') {
      setAuthState((prevState) => ({ ...prevState, loading: true }));
    } else if (session) {
      setAuthState({
        isAuthenticated: true,
        user: session.user as unknown as User,
        loading: false,
      });
      localStorage.setItem('auth', JSON.stringify(session));
    } else {
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
      });
      localStorage.removeItem('auth');
    }
  }, [session, status]);

  return (
    <AuthContext.Provider value={{ ...authState, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
