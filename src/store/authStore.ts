import { create } from 'zustand';
import { User } from '../types';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, phone: string, role: 'client' | 'provider') => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  isAuthenticated: !!localStorage.getItem('token'),
  token: localStorage.getItem('token'),
  
  login: async (email: string, password: string) => {
    // Simulação de login
    const mockUser: User = {
      id: '1',
      email,
      name: 'Usuário',
      phone: '+5531999999999',
      role: 'client',
    };
    
    const token = 'mock-token-' + Date.now();
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    set({
      user: mockUser,
      isAuthenticated: true,
      token,
    });
  },

  signup: async (email: string, password: string, name: string, phone: string, role: 'client' | 'provider') => {
    // Simulação de signup
    const mockUser: User = {
      id: Math.random().toString(),
      email,
      name,
      phone,
      role,
    };
    
    const token = 'mock-token-' + Date.now();
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    set({
      user: mockUser,
      isAuthenticated: true,
      token,
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({
      user: null,
      isAuthenticated: false,
      token: null,
    });
  },
}));