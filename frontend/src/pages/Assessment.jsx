import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VOCATIONAL_QUESTIONS, ASSESSMENT_CATEGORIES } from '../data/questions';
import { ProgressBar } from '../components/ProgressBar';
import { assessmentService } from '../services/api';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';

export const Assessment = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const currentQuestion = VOCATIONAL_QUESTIONS[currentIdx];
  const totalQuestions = VOCATIONAL_QUESTIONS.length;

  const currentCategory = ASSESSMENT_CATEGORIES.find(
    (c) => c.id === currentQuestion.category
  );

  const selectedOption = answers[currentQuestion.id];

  const handleSelectOption = (option) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        question: currentQuestion.question,
        category: currentQuestion.category,
        categoryName: currentQuestion.categoryName,
        optionId: option.id,
        answerText: option.label,
        value: option.value,
      },
    }));
    setError('');
  };

  const handleNext = () => {
    if (!answers[currentQuestion.id]) {
      setError('Por favor seleccioná una opción para continuar.');
      return;
    }
    setError('');
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    setError('');
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      // Save assessment answers to backend
      const response = await assessmentService.create(answers);
      // Navigate to results page with the created assessment ID
      navigate(`/results/${response.id}`);
    } catch (err) {
      console.error('Error al guardar el cuestionario:', err);
      setError(
        'Ocurrió un error al procesar tu cuestionario. Por favor intentá nuevamente.'
      );
      setSubmitting(false);
    }
  };

  if (submitting) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-sky-400 flex items-center justify-center shadow-xl shadow-brand-500/30 animate-bounce">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <div className="absolute inset-0 rounded-3xl bg-brand-500 blur-xl opacity-40 animate-pulse -z-10" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          La Inteligencia Artificial está analizando tus 20 respuestas...
        </h2>
        <p className="mt-3 text-slate-300 max-w-md text-sm leading-relaxed">
          Correlacionando tus intereses, habilidades cognitivas y metas de futuro con más de 120 áreas de estudio y programas universitarios.
        </p>

        <div className="mt-8 flex items-center space-x-2 text-xs font-semibold text-brand-400 bg-brand-500/10 px-4 py-2 rounded-full border border-brand-500/20">
          <div className="w-2 h-2 rounded-full bg-brand-400 animate-ping" />
          <span>Generando tus 5 carreras con mayor compatibilidad</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
      {/* Header and Progress Bar */}
      <div className="mb-8">
        <ProgressBar
          currentStep={currentIdx + 1}
          totalSteps={totalQuestions}
          categoryName={currentCategory?.name || currentQuestion.categoryName}
        />
      </div>

      {/* Question Card Container */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative transition-all duration-300">
        {/* Error notification */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center space-x-3 text-amber-300 text-sm animate-shake">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Question Category & Number */}
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brand-400 mb-3">
          <HelpCircle className="w-4 h-4" />
          <span>Pregunta #{currentIdx + 1}</span>
        </div>

        {/* Question Text */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug">
          {currentQuestion.question}
        </h2>

        {/* Options List */}
        <div className="mt-8 space-y-3.5">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOption?.optionId === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelectOption(option)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-start space-x-4 group ${
                  isSelected
                    ? 'bg-gradient-to-r from-brand-600/30 to-indigo-600/20 border-brand-400 shadow-md shadow-brand-500/10 text-white'
                    : 'bg-slate-900/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/50 text-slate-200'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-brand-500 text-white shadow-sm'
                      : 'bg-slate-800 text-slate-400 border border-slate-700 group-hover:text-slate-200'
                  }`}
                >
                  {option.id.toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-sm sm:text-base font-medium leading-relaxed">
                    {option.label}
                  </p>
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            id="btn-next-question"
            className="flex items-center space-x-2 px-7 py-3 rounded-xl text-sm font-bold bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25 transition-all duration-200"
          >
            <span>{currentIdx === totalQuestions - 1 ? 'Finalizar y ver Resultados' : 'Siguiente'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
