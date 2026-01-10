import React, { useEffect, useRef, useState } from 'react';
import { ChatBubbleLeftRightIcon, PaperAirplaneIcon, SparklesIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { resolveChatId, sendAssistantMessage } from '../api/gptunnelAssistant';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  isError?: boolean;
};

type Props = {
  sessionToken?: string;
  maxContext?: number;
};

const INPUT_LIMIT = 2000;

const GptunnelChatWidget: React.FC<Props> = ({ sessionToken, maxContext = 10 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Привет! Я ассистент GPTunnel. Задай вопрос — отвечу и сохраню контекст по chatId.',
    },
  ]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    resolveChatId(sessionToken)
      .then((id) => {
        if (isMounted) setChatId(id);
      })
      .catch(() => {
        if (isMounted) setError('Не удалось сгенерировать chatId.');
      });
    return () => {
      isMounted = false;
    };
  }, [sessionToken]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isSending]);

  const handleSend = async () => {
    if (!input.trim() || isSending) return;
    if (!chatId) {
      setError('Нет chatId. Обновите страницу или повторите позже.');
      return;
    }

    const trimmed = input.trim().slice(0, INPUT_LIMIT);
    const userMessage: Message = { id: `u-${Date.now()}`, role: 'user', text: trimmed };

    setInput('');
    setError(null);
    setMessages((prev) => [...prev, userMessage]);
    setIsSending(true);

    try {
      const reply = await sendAssistantMessage({
        message: trimmed,
        chatId,
        maxContext,
      });
      const assistantMessage: Message = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        text: reply || 'Пустой ответ от ассистента.',
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const friendly = err?.message || 'Ошибка запроса к GPTunnel.';
      const assistantMessage: Message = {
        id: `e-${Date.now()}`,
        role: 'assistant',
        text: `Ошибка: ${friendly}`,
        isError: true,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setError(friendly);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[70] flex flex-col items-end">
      {isOpen && (
        <div
          className="
            fixed bottom-0 left-0 right-0 top-0 md:relative md:top-auto md:left-auto md:right-auto
            md:w-96 md:h-[540px] bg-slate-950/95 md:bg-slate-900/90 backdrop-blur-2xl 
            md:border border-indigo-500/30 md:rounded-[28px] shadow-3xl 
            md:mb-4 flex flex-col overflow-hidden animate-fade-in
          "
        >
          <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-indigo-500/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30">
                <SparklesIcon className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <span className="text-white font-black uppercase tracking-widest text-[10px] block leading-none mb-1">
                  GPTunnel Assistant
                </span>
                <span className="text-indigo-400 text-[10px] font-bold tracking-wide block leading-none">
                  ChatId сохраняет контекст
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-xl bg-slate-800/50 text-slate-400 hover:text-white transition-all active:scale-90"
              aria-label="Закрыть чат"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div
                  className={`max-w-[85%] p-4 rounded-[18px] text-sm leading-relaxed shadow-lg ${
                    m.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : m.isError
                        ? 'bg-rose-900/70 text-rose-50 rounded-tl-none border border-rose-700/60'
                        : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700/50'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isSending && (
              <div className="flex justify-start">
                <div className="bg-slate-800 text-indigo-400 p-4 rounded-[18px] rounded-tl-none border border-slate-700/50 animate-pulse text-[10px] uppercase font-black tracking-widest">
                  Отправка...
                </div>
              </div>
            )}
          </div>

          <div className="p-5 bg-slate-950/80 border-t border-slate-800 shrink-0 space-y-3">
            <div className="relative group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Напишите сообщение ассистенту..."
                maxLength={INPUT_LIMIT}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl py-4 pl-5 pr-14 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
              />
              <button
                onClick={handleSend}
                disabled={isSending || !chatId}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 active:scale-95 disabled:opacity-50 transition-all shadow-lg"
                aria-label="Отправить"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </div>
            {error && <p className="text-[11px] text-rose-400 font-semibold">Ошибка: {error}</p>}
            {!error && chatId && (
              <p className="text-[10px] text-slate-500 font-semibold truncate">
                chatId: {chatId}
              </p>
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`
          w-16 h-16 bg-indigo-600 text-white rounded-2xl shadow-premium flex items-center justify-center 
          transition-all duration-300 hover:scale-110 active:scale-90 group
          ${isOpen ? 'hidden md:flex' : 'flex'}
        `}
        aria-label="Открыть чат с ассистентом"
      >
        <ChatBubbleLeftRightIcon className="w-8 h-8 transition-transform group-hover:rotate-12" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full animate-pulse"></div>
      </button>
    </div>
  );
};

export default GptunnelChatWidget;
