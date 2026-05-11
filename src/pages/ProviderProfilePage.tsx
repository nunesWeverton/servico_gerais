import { useParams } from 'react-router-dom';
import { Star, Check, MapPin, MessageCircle } from 'lucide-react';
import { mockProviders, mockServices } from '../services/mockData';

export function ProviderProfilePage() {
  const { id } = useParams();
  const provider = mockProviders.find((p) => p.id === id);
  const services = mockServices.filter((s) => s.providerId === id);

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 text-center">
          <p className="text-gray-600 text-xl">Prestador não encontrado</p>
        </div>
      </div>
    );
  }

  const handleWhatsApp = (serviceName: string) => {
    const message = `Olá! Vi seu perfil no OP Serviços e quero contratar o serviço: ${serviceName}.`;
    const url = `https://wa.me/${provider.phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner */}
      <div className="relative h-64 md:h-80">
        <img
          src={provider.photo}
          alt={provider.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info Section */}
      <div className="bg-white shadow -mt-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-anthracite">{provider.name}</h1>
                {provider.verified && (
                  <Check className="text-green-500" size={24} />
                )}
              </div>
              {provider.isPremium && (
                <span className="inline-block bg-primary text-white px-3 py-1 rounded text-sm font-bold mb-2">
                  Premium
                </span>
              )}
            </div>

            <div className="text-left md:text-right">
              <div className="flex items-center gap-1 justify-start md:justify-end mb-2">
                <Star className="text-yellow-500" size={20} />
                <span className="text-2xl font-bold">{provider.rating}</span>
              </div>
              <span
                className={`inline-block text-sm font-semibold px-3 py-1 rounded ${
                  provider.isOnline
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {provider.isOnline ? '● Online' : '● Offline'}
              </span>
            </div>
          </div>

          <p className="text-gray-600 mb-2">{provider.bio}</p>

          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <MapPin size={18} />
            <span>{provider.neighborhood}</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleWhatsApp('Informações')}
              className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded font-bold hover:bg-green-600 transition"
            >
              <MessageCircle size={20} />
              Entre em Contato
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-anthracite mb-6">Serviços</h2>

        {services.length > 0 ? (
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-anthracite">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 mt-1">{service.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      R$ {service.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleWhatsApp(service.name)}
                  className="w-full bg-green-500 text-white font-bold py-2 rounded hover:bg-green-600 transition flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  Solicitar via WhatsApp
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-gray-600">Nenhum serviço cadastrado</p>
          </div>
        )}
      </div>

      {/* Portfolio Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-anthracite mb-6">Portfólio</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300"
            alt="Portfolio"
            className="rounded-lg shadow"
          />
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300"
            alt="Portfolio"
            className="rounded-lg shadow"
          />
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300"
            alt="Portfolio"
            className="rounded-lg shadow"
          />
        </div>
      </div>
    </div>
  );
}