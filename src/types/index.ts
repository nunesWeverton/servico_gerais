export interface Provider {
  id: string;
  name: string;
  photo: string;
  rating: number;
  category: string;
  isPremium: boolean;
  isOnline: boolean;
  phone: string;
  bio: string;
  verified: boolean;
  neighborhood: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  providerId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'client' | 'provider';
}