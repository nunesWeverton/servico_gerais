import { Link } from 'react-router-dom';
import { LogOut, User, Menu, X } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useState } from 'react';

export function Header() {
  const { isAuthenticated, logout, user } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          OP Serviços
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm">{user?.name}</span>
              <button
                onClick={logout}
                className="flex items-center gap-2 bg-white text-primary px-4 py-2 rounded hover:bg-secondary transition"
              >
                <LogOut size={16} />
                Sair
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 hover:bg-red-700 transition rounded"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-white text-primary hover:bg-secondary transition rounded"
              >
                Cadastro
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary px-4 pb-4">
          <nav className="flex flex-col gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm">{user?.name}</span>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 bg-white text-primary px-4 py-2 rounded hover:bg-secondary transition w-full justify-center"
                >
                  <LogOut size={16} />
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 hover:bg-red-700 transition rounded text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-white text-primary hover:bg-secondary transition rounded text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cadastro
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}