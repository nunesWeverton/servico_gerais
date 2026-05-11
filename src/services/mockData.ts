import { Provider } from '../types';

export const mockProviders: Provider[] = [
  {
    id: '1',
    name: 'João Eletricista',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    rating: 4.8,
    category: 'Elétrica',
    isPremium: true,
    isOnline: true,
    phone: '5531999999999',
    bio: 'Especialista em instalações elétricas residenciais e comerciais.',
    verified: true,
    neighborhood: 'Centro',
  },
  {
    id: '2',
    name: 'Maria Beleza',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
    rating: 4.9,
    category: 'Beleza',
    isPremium: false,
    isOnline: true,
    phone: '5531988888888',
    bio: 'Cabelereira e manicure com 10 anos de experiência.',
    verified: true,
    neighborhood: 'Pilar',
  },
  {
    id: '3',
    name: 'Carlos Limpeza',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    rating: 4.7,
    category: 'Limpeza',
    isPremium: true,
    isOnline: false,
    phone: '5531977777777',
    bio: 'Serviços de limpeza residencial e comercial.',
    verified: false,
    neighborhood: 'Bauxita',
  },
];

export const mockServices = [
  { id: '1', name: 'Instalação de Tomadas', description: 'Instalação e reparo de tomadas elétricas.', price: 50, providerId: '1' },
  { id: '2', name: 'Corte de Cabelo Feminino', description: 'Corte, escova e tratamento capilar.', price: 80, providerId: '2' },
  { id: '3', name: 'Limpeza Residencial', description: 'Limpeza completa de casa ou apartamento.', price: 120, providerId: '3' },
];