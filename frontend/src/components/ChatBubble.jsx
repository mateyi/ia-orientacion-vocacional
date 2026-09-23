import React from 'react';
import { Bot, User as UserIcon } from 'lucide-react';

export const ChatBubble = ({ message, userName = 'Tú' }) => {
  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={`flex items-start gap-3.5 my-3 ${
        isAssistant ? 'justify-start' : 'justify-end'
      }`}
    >
      {/* Assistant Avatar */}
      {isAssistant && (
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center shadow-md shadow-brand-500/20 shrink-0">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}

      {/* Message Box */}
      <div
        className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed ${
          isAssistant
            ? 'bg-slate-900/90 border border-slate-800 text-slate-100 rounded-tl-sm shadow-lg'
            : 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white rounded-tr-sm shadow-md shadow-brand-500/20'
        }`}
      >
        <div className="flex items-center justify-between mb-1.5 text-[11px] opacity-75 font-semibold">
          <span>{isAssistant ? 'Orientador Vocacional IA' : userName}</span>
          {message.created_at && (
            <span>
              {new Date(message.created_at).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          )}
        </div>
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>

      {/* User Avatar */}
      {!isAssistant && (
        <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-md shrink-0 text-slate-300">
          <UserIcon className="w-5 h-5" />
        </div>
      )}
    </div>
  );
};
