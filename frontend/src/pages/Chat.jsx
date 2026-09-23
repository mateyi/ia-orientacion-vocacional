import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { chatService, assessmentService } from '../services/api';
import { ChatBubble } from '../components/ChatBubble';
import {
  Send,
  Bot,
  Sparkles,
  HelpCircle,
  RotateCcw,
  Briefcase,
  GraduationCap,
} from 'lucide-react';

export const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [latestAssessmentId, setLatestAssessmentId] = useState(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const initChat = async () => {
      try {
        // 1. Get latest assessment ID
        const assessments = await assessmentService.getMyAssessments();
        if (assessments && assessments.length > 0) {
          setLatestAssessmentId(assessments[0].id);
        }

        // 2. Load past chat history
        const history = await chatService.getHistory();
        if (history && history.length > 0) {
          setMessages(history);
        } else {
          // Welcoming message if history is empty
          setMessages([
            {
              id: 'welcome',
              role: 'assistant',
              content: `¡Hola ${
                user?.full_name ? user.full_name.split(' ')[0] : ''
              }! Soy tu orientador vocacional con Inteligencia Artificial. Ya cuento con el contexto de tus preferencias y respuestas vocacionales. ¿Qué dudas tenés sobre tus carreras recomendadas, universidades o salidas laborales?`,
              created_at: new Date().toISOString(),
            },
          ]);
        }
      } catch (err) {
        console.error('Error al inicializar el chat:', err);
      } finally {
        setInitialLoading(false);
      }
    };

    initChat();
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend) => {
    const content = textToSend || inputMessage;
    if (!content.trim() || loading) return;

    const tempUserMsg = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempUserMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await chatService.sendMessage(
        content.trim(),
        latestAssessmentId
      );
      setMessages((prev) => [...prev, response]);
    } catch (err) {
      console.error('Error al enviar mensaje:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content:
            'Disculpá, hubo un inconveniente al conectar con el servidor. Por favor intentá consultarme nuevamente.',
          created_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    '¿Cuál de mis carreras recomendadas tiene mayor salario y demanda laboral?',
    '¿En qué universidades públicas o privadas me conviene averiguar?',
    '¿Cómo sería un día típico de trabajo en mi carrera con mayor porcentaje?',
    'Tengo dudas entre dos carreras, ¿cómo decido cuál elegir?',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 h-[calc(100vh-5rem)] flex flex-col">
      {/* Chat Header */}
      <div className="glass-panel rounded-2xl px-5 py-4 border border-slate-800 flex items-center justify-between mb-4 shrink-0 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center shadow-md shadow-brand-500/20">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0a0f1d]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Orientador Vocacional IA
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-brand-500/10 text-brand-400 border border-brand-500/30">
                En Línea
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Asesoramiento personalizado con el contexto de tu test vocacional
            </p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-2 glass-panel rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-inner">
        {initialLoading ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm space-y-3">
            <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
            <p>Cargando historial de conversación...</p>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <ChatBubble
                key={msg.id || msg.created_at}
                message={msg}
                userName={user?.full_name || 'Vos'}
              />
            ))}

            {loading && (
              <div className="flex items-start gap-3 my-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center shadow-md shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-sm p-4 text-sm text-slate-300 flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-brand-400 animate-bounce" />
                  <div
                    className="w-2 h-2 rounded-full bg-brand-400 animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                  <div
                    className="w-2 h-2 rounded-full bg-brand-400 animate-bounce"
                    style={{ animationDelay: '0.4s' }}
                  />
                  <span className="text-xs text-slate-400 ml-2">El orientador está pensando...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Suggested Quick Questions */}
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 shrink-0 scrollbar-none">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(q)}
            className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-brand-500/50 hover:bg-slate-800/80 text-xs text-slate-300 hover:text-white transition-all flex items-center space-x-1.5 shrink-0"
          >
            <Sparkles className="w-3 h-3 text-brand-400" />
            <span>{q}</span>
          </button>
        ))}
      </div>

      {/* Input Box Bar */}
      <div className="mt-3 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center"
        >
          <input
            id="input-chat-message"
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Preguntale lo que quieras a tu orientador vocacional..."
            className="w-full pl-5 pr-14 py-3.5 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all shadow-xl"
          />
          <button
            type="submit"
            id="btn-chat-send"
            disabled={!inputMessage.trim() || loading}
            className="absolute right-2.5 p-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-30 text-white shadow-md shadow-brand-500/25 transition-all"
            aria-label="Enviar mensaje"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
