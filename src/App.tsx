import { useState, useMemo } from 'react';
import { 
  Search, MapPin, Star, ShieldCheck, MessageCircle, 
  ArrowLeft, User, Briefcase, Filter, ChevronRight, 
  Menu, Power, LayoutDashboard, Plus, Trash2, Settings, LogOut, CheckCircle2,
  Zap, Eraser, Paintbrush, Scissors, Truck, Hammer, Car, Dog
} from 'lucide-react';

// --- BASE DE DADOS (MOCK DATA) ---
const mockProviders = [
  { id: '1', name: 'Marcos Eletricista', category: 'Elétrica', neighborhood: 'Bauxita', rating: 4.9, photo: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400', phone: '5531999999999', isPremium: true, verified: true },
  { id: '2', name: 'Ana Limpeza', category: 'Limpeza', neighborhood: 'Pilar', rating: 4.8, photo: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400', phone: '5531988888888', isPremium: false, verified: true },
  { id: '3', name: 'Carlos Pintor', category: 'Pintura', neighborhood: 'Centro', rating: 4.7, photo: 'https://images.unsplash.com/photo-1589939705384-5185138a04b9?w=400', phone: '5531977777777', isPremium: true, verified: false },
  { id: '4', name: 'Juliana Cortes', category: 'Beleza', neighborhood: 'Cabeças', rating: 5.0, photo: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400', phone: '5531966666666', isPremium: false, verified: true },
  { id: '5', name: 'Ricardo Mudanças', category: 'Mudanças', neighborhood: 'Saramenha', rating: 4.6, photo: 'https://images.unsplash.com/photo-1520607162513-94ad2c666f54?w=400', phone: '5531955555555', isPremium: false, verified: true },
  { id: '6', name: 'Oficina do Zé', category: 'Mecânico', neighborhood: 'Bauxita', rating: 4.9, photo: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=400', phone: '5531944444444', isPremium: true, verified: true },
  { id: '7', name: 'Dra. Sandra (Vet)', category: 'Pet Shop', neighborhood: 'Antônio Dias', rating: 4.8, photo: 'https://images.unsplash.com/photo-1559599141-3816a0b721e4?w=400', phone: '5531933333333', isPremium: false, verified: true },
];

const mockServices = [
  { id: 's1', providerId: '1', name: 'Troca de Chuveiro', price: 85.00 },
  { id: 's2', providerId: '1', name: 'Instalação de Tomada', price: 45.00 },
  { id: 's3', providerId: '1', name: 'Manutenção de Quadro', price: 150.00 },
  { id: 's4', providerId: '2', name: 'Limpeza Padrão', price: 160.00 },
  { id: 's5', providerId: '2', name: 'Limpeza Pós-Obra', price: 400.00 },
  { id: 's6', providerId: '6', name: 'Troca de Óleo', price: 190.00 },
  { id: 's7', providerId: '6', name: 'Alinhamento', price: 120.00 },
];

export default function App() {
  const [view, setView] = useState<'home' | 'profile' | 'account' | 'dashboard'>('home');
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBairro, setFilterBairro] = useState('Todos');
  const [filterCategory, setFilterCategory] = useState('Todos');
  const [isOnline, setIsOnline] = useState(true);

  // --- FILTROS E RANKING PREMIUM ---
  const filteredProviders = useMemo(() => {
    return mockProviders
      .filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBairro = filterBairro === 'Todos' || p.neighborhood === filterBairro;
        const matchesCat = filterCategory === 'Todos' || p.category === filterCategory;
        return matchesSearch && matchesBairro && matchesCat;
      })
      .sort((a, b) => {
        if (a.isPremium === b.isPremium) return b.rating - a.rating;
        return a.isPremium ? -1 : 1; // Premium (quem paga) no topo
      });
  }, [searchTerm, filterBairro, filterCategory]);

  const activeProvider = mockProviders.find(p => p.id === selectedProviderId) || mockProviders[0];
  const currentServices = mockServices.filter(s => s.providerId === activeProvider.id);

  const totalValue = useMemo(() => {
    return currentServices.filter(s => selectedServices.includes(s.id)).reduce((acc, curr) => acc + curr.price, 0);
  }, [selectedServices, currentServices]);

  const handleWhatsApp = () => {
    const list = currentServices.filter(s => selectedServices.includes(s.id)).map(s => `• ${s.name}`).join('%0A');
    const msg = `Olá ${activeProvider.name}! 👋%0AVi seu perfil no *OP Serviços* e quero orçamento para:%0A${list}%0A%0A*Total Estimado: R$ ${totalValue.toFixed(2)}*`;
    window.open(`https://wa.me/${activeProvider.phone}?text=${msg}`, '_blank');
  };

  const categories = [
    { name: 'Todos', icon: <Menu size={20} /> },
    { name: 'Elétrica', icon: <Zap size={20} /> },
    { name: 'Limpeza', icon: <Eraser size={20} /> },
    { name: 'Pintura', icon: <Paintbrush size={20} /> },
    { name: 'Beleza', icon: <Scissors size={20} /> },
    { name: 'Mecânico', icon: <Car size={20} /> },
    { name: 'Pet Shop', icon: <Dog size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      
      {/* --- HOME DO CLIENTE --- */}
      {view === 'home' && (
        <div className="flex flex-col min-h-screen">
          <header className="bg-[#E24B4A] p-6 lg:p-12 text-white shadow-lg">
            <div className="max-w-7xl mx-auto flex justify-between items-center mb-8">
              <h1 className="text-2xl lg:text-4xl font-black italic tracking-tighter uppercase">OP SERVIÇOS</h1>
              <button onClick={() => setView('account')} className="bg-white/20 p-3 rounded-2xl hover:bg-white/30 transition shadow-sm">
                <User size={24} />
              </button>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <div className="relative">
                <Search className="absolute left-5 top-4 text-red-200" size={20} />
                <input 
                  type="text" 
                  placeholder="Eletricista, Diarista, Pintor..." 
                  className="w-full py-4 pl-14 pr-6 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-red-100 outline-none focus:bg-white/20 transition text-lg"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Filtro de Bairros */}
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {['Todos', 'Bauxita', 'Pilar', 'Centro', 'Cabeças', 'Saramenha'].map(b => (
                  <button key={b} onClick={() => setFilterBairro(b)} className={`px-5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border ${filterBairro === b ? 'bg-white text-red-600 border-white shadow-md' : 'bg-red-700/30 text-white border-white/10'}`}>{b}</button>
                ))}
              </div>
            </div>
          </header>

          {/* Categorias */}
          <section className="max-w-7xl mx-auto w-full p-6 lg:px-10">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Categorias</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {categories.map(cat => (
                <button 
                  key={cat.name}
                  onClick={() => setFilterCategory(cat.name)}
                  className={`flex flex-col items-center min-w-[100px] p-5 rounded-[32px] transition-all border-2 ${filterCategory === cat.name ? 'border-red-500 bg-red-50 text-red-600 shadow-md' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'}`}
                >
                  <div className={`mb-3 p-3 rounded-2xl ${filterCategory === cat.name ? 'bg-red-600 text-white' : 'bg-slate-100'}`}>{cat.icon}</div>
                  <span className="text-[10px] font-black uppercase">{cat.name}</span>
                </button>
              ))}
            </div>
          </section>

          <main className="max-w-7xl mx-auto w-full p-6 lg:p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProviders.map(p => (
              <div key={p.id} onClick={() => { setSelectedProviderId(p.id); setSelectedServices([]); setView('profile'); }} className={`p-6 rounded-[32px] border flex gap-5 transition hover:shadow-xl cursor-pointer bg-white group ${p.isPremium ? 'border-red-200 ring-2 ring-red-50' : 'border-slate-100'}`}>
                <div className="relative shrink-0">
                  <img src={p.photo} className="w-20 h-20 rounded-[24px] object-cover group-hover:scale-105 transition" />
                  {p.isPremium && <div className="absolute -top-2 -right-2 bg-red-600 text-white p-1.5 rounded-full border-2 border-white"><ShieldCheck size={14} /></div>}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-slate-800">{p.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{p.category} • {p.neighborhood}</p>
                  <div className="flex items-center gap-1 mt-3 text-sm font-bold text-amber-500"><Star size={14} fill="currentColor" /> {p.rating}</div>
                </div>
              </div>
            ))}
          </main>
        </div>
      )}

      {/* --- DASHBOARD DO PRESTADOR --- */}
      {view === 'dashboard' && (
        <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
          <aside className="w-full lg:w-72 bg-white border-b lg:border-r p-8 flex lg:flex-col justify-between items-center lg:items-start sticky top-0 z-50">
            <div>
              <h2 className="font-black text-red-600 text-2xl italic mb-10 hidden lg:block uppercase">Painel OP</h2>
              <div className="flex items-center gap-4 mb-10">
                <img src={mockProviders[0].photo} className="w-14 h-14 rounded-2xl object-cover" />
                <div className="hidden lg:block">
                  <p className="font-bold text-slate-800">{mockProviders[0].name}</p>
                  <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-black uppercase">Premium</span>
                </div>
              </div>
            </div>
            <nav className="flex lg:flex-col gap-4">
              <button className="p-4 text-red-600 bg-red-50 rounded-2xl shadow-sm"><LayoutDashboard size={24} /></button>
              <button className="p-4 text-slate-300 hover:bg-slate-100 rounded-2xl transition"><Settings size={24} /></button>
              <button onClick={() => setView('home')} className="p-4 text-slate-300 hover:text-red-600 rounded-2xl transition"><LogOut size={24} /></button>
            </nav>
            <button onClick={() => setIsOnline(!isOnline)} className={`hidden lg:flex w-full mt-auto p-5 rounded-3xl items-center justify-center gap-3 font-bold shadow-lg transition ${isOnline ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
              <Power size={20} /> {isOnline ? 'Está Online' : 'Ficar Online'}
            </button>
          </aside>

          <main className="flex-1 p-6 lg:p-16">
            <header className="mb-12">
              <h2 className="text-4xl font-black text-slate-800 italic uppercase leading-none">Meus Serviços</h2>
              <p className="text-slate-400 font-medium mt-2">Personalize sua tabela de preços em Ouro Preto.</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
              {mockServices.filter(s => s.providerId === '1').map(s => (
                <div key={s.id} className="p-8 bg-white border border-slate-100 rounded-[40px] flex justify-between items-center shadow-sm hover:shadow-md transition group">
                  <div>
                    <p className="font-bold text-xl text-slate-800">{s.name}</p>
                    <p className="text-sm font-black text-red-600 mt-1 uppercase tracking-tighter">R$ {s.price.toFixed(2)}</p>
                  </div>
                  <button className="p-4 text-slate-200 group-hover:text-red-500 transition-colors"><Trash2 size={24}/></button>
                </div>
              ))}
              <button className="p-8 border-4 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center justify-center text-slate-300 hover:border-red-300 hover:text-red-600 transition-all group">
                <Plus size={40} className="group-hover:scale-110 transition" />
                <span className="font-black text-xs uppercase mt-3 tracking-widest">Adicionar Serviço</span>
              </button>
            </div>
          </main>
        </div>
      )}

      {/* --- PERFIL DETALHADO (CONTRATAÇÃO COM CAIXINHAS) --- */}
      {view === 'profile' && activeProvider && (
        <div className="flex flex-col lg:flex-row min-h-screen bg-white">
          <div className="relative h-72 lg:h-screen lg:w-1/2 shrink-0">
            <img src={activeProvider.photo} className="w-full h-full object-cover" />
            <button onClick={() => setView('home')} className="absolute top-8 left-8 bg-white/90 p-4 rounded-2xl shadow-2xl hover:bg-white transition"><ArrowLeft size={24} /></button>
          </div>
          <div className="flex-1 p-8 lg:p-20 bg-white lg:bg-slate-50 -mt-10 lg:mt-0 rounded-t-[40px] lg:rounded-none overflow-y-auto">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-4xl lg:text-6xl font-black text-slate-800 mb-2 leading-none">{activeProvider.name}</h1>
              <p className="text-slate-400 text-lg lg:text-xl font-medium mb-12 italic">{activeProvider.category} em {activeProvider.neighborhood}</p>
              
              <h2 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-6">Selecione os Serviços</h2>
              <div className="space-y-4 mb-40">
                {currentServices.map(s => (
                  <div 
                    key={s.id} 
                    onClick={() => setSelectedServices(prev => prev.includes(s.id) ? prev.filter(i => i !== s.id) : [...prev, s.id])}
                    className={`p-7 border-2 rounded-[32px] flex justify-between items-center cursor-pointer transition-all shadow-sm ${selectedServices.includes(s.id) ? 'border-red-500 bg-red-50' : 'border-white bg-white hover:border-slate-200'}`}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition ${selectedServices.includes(s.id) ? 'bg-red-500 border-red-500 text-white shadow-inner' : 'border-slate-200 bg-white'}`}>
                        {selectedServices.includes(s.id) && <CheckCircle2 size={16} />}
                      </div>
                      <p className="font-bold text-slate-800 text-xl">{s.name}</p>
                    </div>
                    <span className="font-black text-slate-400 text-sm">R$ {s.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Checkout Fixo */}
              <div className="fixed bottom-0 left-0 right-0 p-8 bg-white/90 backdrop-blur-md border-t flex flex-col items-center z-50">
                <div className="w-full max-w-lg flex justify-between items-center mb-5 px-2">
                  <span className="font-bold text-slate-400 uppercase text-xs tracking-widest">Orçamento Total</span>
                  <span className="text-3xl font-black text-red-600">R$ {totalValue.toFixed(2)}</span>
                </div>
                <button 
                  disabled={selectedServices.length === 0}
                  onClick={handleWhatsApp}
                  className={`w-full max-w-lg py-6 rounded-[28px] font-black flex items-center justify-center gap-3 transition shadow-2xl ${selectedServices.length > 0 ? 'bg-green-500 text-white active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                >
                  <MessageCircle size={26} /> CHAMAR NO WHATSAPP ({selectedServices.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- SELECÇÃO DE TIPO DE CONTA --- */}
      {view === 'account' && (
        <div className="flex-1 flex items-center justify-center p-6 bg-slate-50 min-h-screen">
          <div className="w-full max-w-md space-y-4">
            <button onClick={() => { setView('home'); }} className="w-full p-8 bg-white border-2 border-transparent hover:border-red-500 rounded-[48px] shadow-xl flex items-center justify-between group transition">
              <div className="flex items-center gap-6 text-left">
                <div className="p-5 bg-red-50 rounded-3xl group-hover:bg-red-600 group-hover:text-white transition"><User size={32} /></div>
                <div><p className="font-black text-slate-800 text-2xl leading-none">Sou Cliente</p><p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-tighter">Buscar em Ouro Preto</p></div>
              </div>
              <ChevronRight className="text-slate-300 group-hover:text-red-500" />
            </button>
            <button onClick={() => { setView('dashboard'); }} className="w-full p-8 bg-white border-2 border-transparent hover:border-red-500 rounded-[48px] shadow-xl flex items-center justify-between group transition">
              <div className="flex items-center gap-6 text-left">
                <div className="p-5 bg-red-50 rounded-3xl group-hover:bg-red-600 group-hover:text-white transition"><Briefcase size={32} /></div>
                <div><p className="font-black text-slate-800 text-2xl leading-none">Sou Prestador</p><p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-tighter">Gerenciar meus serviços</p></div>
              </div>
              <ChevronRight className="text-slate-300 group-hover:text-red-500" />
            </button>
            <button onClick={() => setView('home')} className="w-full py-4 text-slate-300 font-bold uppercase tracking-widest text-xs hover:text-red-500 transition">Voltar</button>
          </div>
        </div>
      )}

    </div>
  );
}