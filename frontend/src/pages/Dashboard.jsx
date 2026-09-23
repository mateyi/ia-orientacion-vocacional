import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  assessmentService,
  recommendationService,
  chatService,
} from '../services/api';
import {
  Compass,
  Sparkles,
  MessageSquare,
  GraduationCap,
  Calendar,
  ArrowRight,
  TrendingUp,
  RotateCcw,
  CheckCircle,
} from 'lucide-react';

export const Dashboard = () => {
  const { user } = useAuth();
  const [assessments, setAssessments] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [chatCount, setChatCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [assessmentsData, recsData, chatData] = await Promise.all([
          assessmentService.getMyAssessments(),
          recommendationService.getMyRecommendations(),
          chatService.getHistory(),
        ]);
        setAssessments(assessmentsData || []);
        setRecommendations(recsData || []);
        setChatCount(chatData?.length || 0);
      } catch (err) {
        console.error('Error al cargar datos del panel:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center animate-pulse">
          <Compass className="w-6 h-6 text-white animate-spin" />
        </div>
        <p className="text-sm text-slate-400 font-medium">Cargando tu panel personal...</p>
      </div>
    );
  }

  const latestAssessment = assessments[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14 space-y-10">
      {/* Welcome Banner */}
      <div className="glass-panel rounded-3xl p-8 border border-slate-800 bg-gradient-to-r from-brand-950/40 via-slate-900 to-indigo-950/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
            Panel de Orientación Vocacional
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
            Hola, {user?.full_name || 'Estudiante'} 👋
          </h1>
          <p className="text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
            Aquí podés revisar tus evaluaciones vocacionales, volver a consultar las carreras recomendadas y retomar tus charlas con el orientador IA.
          </p>
        </div>

        <div className="flex gap-3 shrink-0">
          <Link
            to="/assessment"
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Nuevo Test Vocacional</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Tests Realizados
            </span>
            <div className="w-9 h-9 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white mt-3">{assessments.length}</p>
          <span className="text-xs text-slate-500 mt-1 block">
            {assessments.length > 0 ? 'Último completado' : 'Pendiente por realizar'}
          </span>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Carreras Sugeridas
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white mt-3">{recommendations.length}</p>
          <span className="text-xs text-slate-500 mt-1 block">
            {recommendations.length > 0 ? 'Generadas con GPT-4o-mini' : 'Sin recomendaciones aún'}
          </span>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Mensajes en Orientador IA
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white mt-3">{chatCount}</p>
          <span className="text-xs text-slate-500 mt-1 block">Conversaciones activas</span>
        </div>
      </div>

      {/* Main Grid: Past Assessments & Saved Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Past Assessments */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-400" />
              <span>Historial de Evaluaciones</span>
            </h2>
            <Link
              to="/assessment"
              className="text-xs font-semibold text-brand-400 hover:text-brand-300"
            >
              Realizar nuevo test →
            </Link>
          </div>

          {assessments.length === 0 ? (
            <div className="glass-panel rounded-2xl p-8 border border-slate-800 text-center">
              <Sparkles className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-sm text-slate-300 font-medium">Aún no completaste ningún test vocacional.</p>
              <Link
                to="/assessment"
                className="mt-4 inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs transition-colors"
              >
                <span>Hacer mi primer test</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {assessments.map((a, idx) => (
                <div
                  key={a.id}
                  className="glass-card rounded-2xl p-5 border border-slate-800 flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                      Evaluación #{assessments.length - idx}
                    </span>
                    <p className="text-sm font-semibold text-white">
                      Completada el {new Date(a.completed_at).toLocaleDateString()} a las{' '}
                      {new Date(a.completed_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    <span className="text-xs text-slate-400">
                      20 respuestas analizadas
                    </span>
                  </div>

                  <Link
                    to={`/results/${a.id}`}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-brand-500 text-slate-200 hover:text-white text-xs font-semibold transition-all border border-slate-700"
                  >
                    <span>Ver Resultados</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Recommended Careers Overview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-400" />
              <span>Carreras Sugeridas Recientes</span>
            </h2>
            {latestAssessment && (
              <Link
                to={`/results/${latestAssessment.id}`}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
              >
                Ver informe completo →
              </Link>
            )}
          </div>

          {recommendations.length === 0 ? (
            <div className="glass-panel rounded-2xl p-8 border border-slate-800 text-center">
              <GraduationCap className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-sm text-slate-300 font-medium">Aún no hay carreras recomendadas.</p>
              <p className="text-xs text-slate-500 mt-1">Completá el test vocacional para que la IA genere tus 5 recomendaciones.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recommendations.slice(0, 5).map((r, idx) => (
                <div
                  key={r.id}
                  className="glass-card rounded-2xl p-4 border border-slate-800 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center space-x-3 truncate">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 text-xs font-bold text-slate-300 flex items-center justify-center shrink-0">
                      #{idx + 1}
                    </div>
                    <div className="truncate">
                      <h4 className="text-sm font-bold text-white truncate">
                        {r.career_name}
                      </h4>
                      <p className="text-xs text-slate-400 truncate">
                        {r.data?.description || 'Carrera universitaria recomendada'}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-bold">
                      {r.compatibility_percentage}% Match
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
