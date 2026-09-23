import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Compass, Sparkles, MessageSquare, LayoutDashboard, LogOut, LogIn, UserPlus, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0a0f1d]/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-white via-slate-100 to-brand-300 bg-clip-text text-transparent">
                OrientaVocacional<span className="text-brand-400">.ai</span>
              </span>
              <span className="block text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                Guía Universitaria con IA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/') ? 'text-brand-400 bg-brand-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Inicio
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/assessment"
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/assessment') ? 'text-brand-400 bg-brand-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-brand-400" />
                  <span>Test Vocacional</span>
                </Link>

                <Link
                  to="/chat"
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/chat') ? 'text-brand-400 bg-brand-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-indigo-400" />
                  <span>Orientador IA</span>
                </Link>

                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/dashboard') ? 'text-brand-400 bg-brand-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                  <span>Mi Panel</span>
                </Link>
              </>
            )}
          </nav>

          {/* Desktop Auth Controls */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-brand-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                    {user?.full_name ? user.full_name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-medium text-slate-200 max-w-[120px] truncate">
                    {user?.full_name || 'Estudiante'}
                  </span>
                </div>
                <button
                  id="btn-navbar-logout"
                  onClick={handleLogout}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all duration-200"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Salir</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  id="btn-navbar-login"
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Ingresar</span>
                </Link>
                <Link
                  to="/register"
                  id="btn-navbar-register"
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-brand-500 hover:bg-brand-600 text-white shadow-md shadow-brand-500/25 transition-all duration-200"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Registrarse</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0f172a]/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Inicio
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/assessment"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
              >
                <Sparkles className="w-5 h-5 text-brand-400" />
                <span>Test Vocacional</span>
              </Link>
              <Link
                to="/chat"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
              >
                <MessageSquare className="w-5 h-5 text-indigo-400" />
                <span>Orientador IA</span>
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
              >
                <LayoutDashboard className="w-5 h-5 text-emerald-400" />
                <span>Mi Panel</span>
              </Link>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  Conectado como <strong className="text-white">{user?.full_name}</strong>
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-sm font-semibold text-rose-400 hover:text-rose-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Salir</span>
                </button>
              </div>
            </>
          ) : (
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700"
              >
                Ingresar
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-brand-500 hover:bg-brand-600"
              >
                Registrarse gratis
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
