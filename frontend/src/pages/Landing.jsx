import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  Compass,
  TrendingUp,
  MessageSquare,
  Award,
  BookOpen,
  ArrowRight,
  CheckCircle,
  Zap,
  Users,
} from 'lucide-react';

export const Landing = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-radial from-brand-600/20 via-indigo-600/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Tag */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs sm:text-sm font-semibold mb-8 backdrop-blur-sm animate-pulse">
          <Sparkles className="w-4 h-4 text-brand-400" />
          <span>Inteligencia Artificial para tu Vocación Universitaria</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Descubrí tu carrera ideal con{' '}
          <span className="bg-gradient-to-r from-brand-400 via-indigo-400 to-sky-300 bg-clip-text text-transparent">
            Inteligencia Artificial
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Completá nuestro test inteligente de 20 preguntas y recibí las 5 carreras universitarias con mayor porcentaje de compatibilidad con tu personalidad, habilidades y metas futuras.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={isAuthenticated ? '/assessment' : '/register'}
            id="btn-hero-cta"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-brand-500 via-brand-600 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white shadow-xl shadow-brand-500/25 hover:shadow-brand-500/40 transition-all duration-300 group"
          >
            <span>{isAuthenticated ? 'Comenzar Test Vocacional' : 'Empezar Gratis Ahora'}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to={isAuthenticated ? '/chat' : '/login'}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-4 rounded-xl text-base font-semibold bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 transition-colors"
          >
            <MessageSquare className="w-5 h-5 text-brand-400" />
            <span>Hablar con Orientador IA</span>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>20 preguntas científicamente formuladas</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Análisis instantáneo con GPT-4o-mini</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>100% Gratuito y en Español</span>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS SECTION */}
      <section className="py-16 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              ¿Por qué elegir nuestra orientación vocacional con IA?
            </h2>
            <p className="mt-3 text-slate-400 text-base">
              Combinamos psicología vocacional tradicional con modelos de lenguaje de última generación para darte claridad absoluta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card rounded-2xl p-7 border border-slate-800 relative group">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-5 text-brand-400 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Test Multidimensional</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Evaluamos 5 áreas esenciales: intereses profundos, habilidades cognitivas, estilo de personalidad, afinidades académicas y expectativas laborales a futuro.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card rounded-2xl p-7 border border-slate-800 relative group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5 text-indigo-400 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Top 5 Carreras con %</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                No te damos una respuesta genérica. Recibís un ranking de 5 carreras con desglose de porcentaje de compatibilidad, ventajas, dificultades y salidas laborales.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card rounded-2xl p-7 border border-slate-800 relative group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 text-emerald-400 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Chatbot Orientador Continuo</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                ¿Te quedaron dudas? Chateá en cualquier momento con el orientador IA, quien conoce tus respuestas y te guía amigablemente en tu toma de decisiones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUESTIONNAIRE CATEGORIES PREVIEW */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">
                Estructura del Diagnóstico
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 leading-tight">
                20 preguntas que revelarán tu vocación profesional
              </h2>
              <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                Diseñado cuidadosamente para que puedas completarlo en menos de 5 minutos, con preguntas directas y opciones bien estructuradas.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <div className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-xs font-bold">1</div>
                  <span><strong>Intereses (5 preguntas):</strong> Qué te apasiona y en qué proyectos perdés la noción del tiempo.</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <div className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-xs font-bold">2</div>
                  <span><strong>Habilidades (5 preguntas):</strong> Tus fortalezas analíticas, comunicacionales y técnicas.</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <div className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-xs font-bold">3</div>
                  <span><strong>Personalidad (4 preguntas):</strong> Trabajo en equipo, tolerancia a la presión y toma de decisiones.</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <div className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-xs font-bold">4</div>
                  <span><strong>Académico (3 preguntas):</strong> Materias preferidas y formatos de aprendizaje óptimos.</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <div className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-xs font-bold">5</div>
                  <span><strong>Metas de Futuro (3 preguntas):</strong> Estilo de vida laboral, remuneración y proyección a 10 años.</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700/60 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs text-slate-400 font-mono">resultado_simulado.json</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Ingeniería en Inteligencia Artificial</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">96% Match</span>
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  Perfil de alta afinidad lógica, resolución analítica y visión de trabajo flexible y tecnológico.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Diseño de Experiencia de Usuario (UX/UI)</span>
                  <span className="px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-bold">89% Match</span>
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  Ideal para combinar empatía interpersonal con creatividad visual y herramientas digitales.
                </p>
              </div>
              <Link
                to={isAuthenticated ? '/assessment' : '/register'}
                className="block text-center w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm transition-colors shadow-lg shadow-brand-500/30"
              >
                Hacé el test para ver tus resultados
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 py-10 bg-[#070b16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Compass className="w-5 h-5 text-brand-400" />
            <span className="text-sm font-semibold text-slate-300">
              OrientaVocacional.ai © 2026 — Plataforma de Orientación con Inteligencia Artificial
            </span>
          </div>
          <div className="text-xs text-slate-500">
            Todos los derechos reservados. Desarrollado con FastAPI, React y OpenAI.
          </div>
        </div>
      </footer>
    </div>
  );
};
