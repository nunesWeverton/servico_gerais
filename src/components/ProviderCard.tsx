import { Star, MapPin, Check } from 'lucide-react';
import { Provider } from '../types';
import { Link } from 'react-router-dom';

interface ProviderCardProps {
  provider: Provider;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <Link to={`/provider/${provider.id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer overflow-hidden">
        <img
          src={provider.photo}
          alt={provider.name}
          className="w-full h-32 md:h-48 object-cover"
        />
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-lg">{provider.name}</h3>
            {provider.verified && <Check className="text-green-500" size={20} />}
          </div>

          <p className="text-sm text-gray-600 mb-2">{provider.category}</p>

          <div className="flex items-center gap-2 mb-2">
            <Star className="text-yellow-500" size={16} />
            <span className="text-sm font-semibold">{provider.rating}</span>
            {provider.isPremium && (
              <span className="text-xs bg-primary text-white px-2 py-1 rounded">
                Premium
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-600">
            <MapPin size={14} />
            {provider.neighborhood}
          </div>

          <div className="mt-3 pt-3 border-t">
            <span
              className={`text-xs font-semibold px-2 py-1 rounded ${
                provider.isOnline
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {provider.isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}