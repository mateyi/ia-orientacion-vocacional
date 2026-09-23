import React from 'react';

export const ProgressBar = ({ currentStep, totalSteps, categoryName }) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs font-semibold tracking-wide">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 uppercase text-[11px]">
            {categoryName || 'Cuestionario'}
          </span>
          <span className="text-slate-400">
            Pregunta {currentStep} de {totalSteps}
          </span>
        </div>
        <span className="text-brand-300 font-bold">{percentage}%</span>
      </div>

      <div className="w-full h-2.5 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
        <div
          className="h-full bg-gradient-to-r from-brand-500 via-indigo-500 to-sky-400 rounded-full transition-all duration-500 ease-out shadow-sm shadow-brand-500/50"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
