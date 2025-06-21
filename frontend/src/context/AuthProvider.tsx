'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useCallback, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/utils/api';
import { LoadingSkeleton, notify } from '@/app/Zakah/common/Common';

import { zakahReducer, initialState, IZakahState, IAction } from './StateProvider';

interface AuthContextProps {
  user: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  router: any;
  zakahState: IZakahState;
  dispatch: React.Dispatch<IAction>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [zakahState, dispatch] = useReducer(zakahReducer, initialState);

  const router = useRouter();

  const handleUnauthenticatedUser = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    router.push("/login");
    setLoading(false);
  }, [router]);

  const handleAuthenticatedUser = useCallback((user: string | null) => {
    setUser(user);
    setIsAuthenticated(true);
    setLoading(false);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      handleUnauthenticatedUser();
      return;
    }
    (async () => {
      try {
        const data = await api.get<{ name: string, email: string }>('/api/user/');
        handleAuthenticatedUser(data?.name);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        handleUnauthenticatedUser();
      }
    })();

  }, [handleUnauthenticatedUser, handleAuthenticatedUser]);

  const login = async (username: string, password: string) => {
    try {
      const data = await api.post<{ access: string; refresh: string }>('/api/token/', { username, password });
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      setIsAuthenticated(true);
      router.push('/');
    } catch (error: unknown) {
      console.error(`Login failed due to ${error}`);
      interface ApiError {
        response?: {
          status: number;
        } | null;
        request?: unknown;
      }

      const apiError = error as ApiError;

      if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof apiError.response === 'object' &&
        apiError.response !== null
      ) {
        if (apiError.response.status === 401) {
          throw new Error('Invalid username or password.');
        } else {
          throw new Error('Server error occurred. Please try again later.');
        }
      } else if (
        typeof error === 'object' &&
        error !== null &&
        'request' in error
      ) {
        throw new Error('Network error. Please check your connection.');
      } else {
        throw new Error('An unexpected error occurred.');
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/login');
    notify.success("You have been logged out!", "logged-out");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, user, router, zakahState, dispatch }}
    >
      {loading ? <LoadingSkeleton /> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
