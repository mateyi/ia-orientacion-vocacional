import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { recommendationService, assessmentService } from '../services/api';
import { CareerCard } from '../components/CareerCard';
import {
  Sparkles,
  Award,
  MessageSquare,
  RotateCcw,
  LayoutDashboard,
  AlertCircle,
} from 'lucide-react';

export const Results = () => {
  const { assessmentId } = useParams();
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError('');
      try {
        let targetId = assessmentId;

        // If no ID passed in params, get user's latest assessment
        if (!targetId) {
          const myAssessments = await assessmentService.getMyAssessments();
          if (myAssessments && myAssessments.length > 0) {
            targetId = myAssessments[0].id;
          } else {
            setError('No encontramos ningún cuestionario completado. Por favor realizá el test vocacional.');
            setLoading(false);
            return;
          }
        }

        // Generate or retrieve recommendations
        const res = await recommendationService.generate(targetId);
        setCareers(res.careers || []);
      } catch (err) {
        console.error('Error al obtener recomendaciones:', err);
        setError('Ocurrió un inconveniente al generar tus recomendaciones. Por favor intentá nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [assessmentId]);

  if (loading) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-brand-500/30 animate-pulse mb-4">
          <Sparkles className="w-8 h-8 text-white animate-spin" />
        </div>
        <h2 className="text-2xl font-bold text-white">Generando tu perfil vocacional personalizado...</h2>
        <p className="text-sm text-slate-400 mt-2">Nuestra IA está calculando los índices de compatibilidad para tus 5 carreras.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300">
          <AlertCircle className="w-10 h-10 text-rose-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-white mb-2">Atención</h2>
          <p className="text-sm text-slate-300 mb-6">{error}</p>
          <Link
            to="/assessment"
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Hacer el Test Vocacional</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 sm:py-14 space-y-10">
      {/* Hero / Header of Results */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-4">
          <Award className="w-4 h-4 text-emerald-400" />
          <span>Diagnóstico Vocacional Completado con Éxito</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Tus 5 Carreras Universitarias Recomendadas
        </h1>
        <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
          Basándonos en tus respuestas, este es el ranking con mayor grado de afinidad para tu desarrollo académico y profesional:
        </p>
      </div>

      {/* Career Cards List */}
      <div className="space-y-6">
        {careers.map((career, idx) => (
          <CareerCard key={idx} career={career} rank={idx + 1} />
        ))}
      </div>

      {/* Action Banner to Chat with AI */}
      <div className="glass-panel rounded-3xl p-8 border border-slate-800 bg-gradient-to-r from-brand-900/40 via-indigo-900/30 to-purple-900/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2 text-brand-400 font-bold text-sm">
            <MessageSquare className="w-4 h-4" />
            <span>¿Tenés dudas sobre alguna de estas carreras?</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Conversá directamente con tu Orientador IA
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            El orientador ya tiene en memoria tus respuestas y estas 5 carreras. Preguntale sobre los planes de estudio, la salida laboral o cómo elegir entre tus opciones favoritas.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Link
            to="/chat"
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition-all text-center"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chatear ahora</span>
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors text-center"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Ir a Mi Panel</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
