import React, { useState } from 'react';
import {
  GraduationCap,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Briefcase,
  ChevronDown,
  ChevronUp,
  School,
} from 'lucide-react';

export const CareerCard = ({ career, rank }) => {
  const [expanded, setExpanded] = useState(false);

  const {
    career_name,
    compatibility_percentage,
    description,
    advantages = [],
    challenges = [],
    required_skills = [],
    university_paths = [],
    future_jobs = [],
  } = career;

  // Color scheme based on percentage
  const getBadgeStyle = (pct) => {
    if (pct >= 90) return 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-300';
    if (pct >= 80) return 'from-brand-500/20 to-blue-500/10 border-brand-500/30 text-brand-300';
    return 'from-indigo-500/20 to-purple-500/10 border-indigo-500/30 text-indigo-300';
  };

  const getProgressGradient = (pct) => {
    if (pct >= 90) return 'from-emerald-500 to-teal-400';
    if (pct >= 80) return 'from-brand-500 to-sky-400';
    return 'from-indigo-500 to-purple-400';
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-all duration-300">
      {/* Header with Rank, Career Title, and Compatibility % */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center font-bold text-slate-300 shrink-0">
            #{rank}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              {career_name}
            </h3>
            <p className="text-sm text-slate-300 mt-1 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Compatibility Gauge Badge */}
        <div className="sm:self-start shrink-0 flex flex-col items-end">
          <div
            className={`px-3.5 py-1.5 rounded-full border bg-gradient-to-r ${getBadgeStyle(
              compatibility_percentage
            )} flex items-center space-x-2`}
          >
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-bold">{compatibility_percentage}% Compatibilidad</span>
          </div>
          <div className="w-32 h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${getProgressGradient(
                compatibility_percentage
              )} rounded-full`}
              style={{ width: `${compatibility_percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Required Skills Chips */}
      <div className="mt-5 pt-4 border-t border-slate-800/80">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          <span>Habilidades Clave</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {required_skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800/70 border border-slate-700/60 text-slate-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Expandable Section: Advantages, Challenges, University Paths, Future Jobs */}
      {expanded ? (
        <div className="mt-5 pt-5 border-t border-slate-800/80 space-y-5 animate-fadeIn">
          {/* Pros & Cons / Advantages & Challenges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Advantages */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/30">
              <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-sm mb-2.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Ventajas y Oportunidades</span>
              </div>
              <ul className="space-y-1.5">
                {advantages.map((adv, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenges */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/30">
              <div className="flex items-center space-x-2 text-amber-400 font-semibold text-sm mb-2.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Desafíos a Considerar</span>
              </div>
              <ul className="space-y-1.5">
                {challenges.map((ch, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* University Paths */}
          {university_paths.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center space-x-2 text-sky-400 font-semibold text-sm mb-2">
                <School className="w-4 h-4" />
                <span>Rutas Universitarias y Terciarias Recomendadas</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {university_paths.map((path, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs rounded-md bg-sky-950/30 border border-sky-800/40 text-sky-200"
                  >
                    {path}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Future Jobs */}
          {future_jobs.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-sm mb-2">
                <Briefcase className="w-4 h-4" />
                <span>Salida Laboral y Roles a Futuro</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {future_jobs.map((job, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs rounded-md bg-indigo-950/30 border border-indigo-800/40 text-indigo-200"
                  >
                    {job}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* Toggle button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 w-full py-2 flex items-center justify-center space-x-1.5 text-xs font-semibold text-brand-400 hover:text-brand-300 hover:bg-slate-800/50 rounded-lg transition-colors border border-transparent hover:border-slate-700"
      >
        <span>{expanded ? 'Mostrar menos detalles' : 'Ver más detalles (universidades, pros, contras, salida laboral)'}</span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
    </div>
  );
};
