import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Compass, LogIn, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/assessment';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor completá todos los campos.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Error al iniciar sesión. Verificá tus credenciales.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card Header */}
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 items-center justify-center shadow-lg shadow-brand-500/25 mb-4">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Iniciar Sesión
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Accedé para ver tus resultados vocacionales y continuar con tu orientación.
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-panel rounded-2xl p-8 border border-slate-800 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start space-x-3 text-rose-300 text-sm">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="input-email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
              >
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="input-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="input-password"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
              >
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="input-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="btn-login-submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white shadow-lg shadow-brand-500/25 flex items-center justify-center space-x-2 transition-all duration-200"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Ingresar a mi cuenta</span>
                </>
              )}
            </button>
          </form>

          {/* Register Prompt */}
          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-400">
              ¿Todavía no tenés una cuenta?{' '}
              <Link
                to="/register"
                id="link-go-to-register"
                className="text-brand-400 hover:text-brand-300 font-semibold underline underline-offset-4 ml-1"
              >
                Registrate gratis aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
