import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProviderCard } from '../components/ProviderCard';
import { mockProviders } from '../services/mockData';
import { Provider } from '../types';

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedNeighborhood = searchParams.get('neighborhood') || 'Centro';
  const selectedCategory = searchParams.get('category') || 'all';

  const neighborhoods = ['Centro', 'Pilar', 'Bauxita', 'Antonio Dias', 'Saramenha', 'Cabeças'];
  const categories = ['all', 'Elétrica', 'Beleza', 'Limpeza', 'Mudanças', 'Turismo'];

  const filteredProviders = mockProviders.filter((p) => {
    const matchNeighborhood = p.neighborhood === selectedNeighborhood;
    const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchNeighborhood && matchCategory;
  });

  const premiumProviders = filteredProviders.filter((p) => p.isPremium);
  const recommendedProviders = [...premiumProviders, ...filteredProviders.filter((p) => !p.isPremium)];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header com Seletor */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-anthracite mb-4">
            Encontre Prestadores de Serviços
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bairro
              </label>
              <select
                value={selectedNeighborhood}
                onChange={(e) =>
                  setSearchParams({
                    neighborhood: e.target.value,
                    category: selectedCategory,
                  })
                }
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                {neighborhoods.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                value={selectedCategory}
                onChange={(e) =>
                  setSearchParams({
                    neighborhood: selectedNeighborhood,
                    category: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === 'all' ? 'Todas as categorias' : c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Destaques Premium */}
      {premiumProviders.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h2 className="text-xl md:text-2xl font-bold text-anthracite mb-4">Destaques Premium</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {premiumProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      )}

      {/* Recomendados */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-xl md:text-2xl font-bold text-anthracite mb-4">Recomendados</h2>
        {recommendedProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-gray-600">
              Nenhum prestador disponível para os filtros selecionados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}