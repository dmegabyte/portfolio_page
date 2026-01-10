
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { projects } from '../data/projects';

const AiConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Привет! Я AI-ассистент этого портфолио. Могу рассказать подробнее о любом проекте или стеке технологий. О чем хочешь узнать?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const context = projects.map(p => `${p.title}: ${p.summary}`).join('\n');
      
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `Ты — экспертный ассистент по портфолио AI-инженера. 
          Отвечай кратко, профессионально и с легким энтузиазмом. 
          Используй данный контекст проектов: ${context}. 
          Если спрашивают о чем-то другом, вежливо вернись к теме технологий и автоматизации.`,
        },
      });

      const response = await chat.sendMessage({ message: userMessage });
      setMessages(prev => [...prev, { role: 'model', text: response.text || 'Извини, возникла ошибка в нейронной сети.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Ошибка подключения к ядру. Проверьте API_KEY.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[70] flex flex-col items-end">
      {isOpen && (
        <div className={`
          fixed bottom-0 left-0 right-0 top-0 md:relative md:top-auto md:left-auto md:right-auto
          md:w-96 md:h-[550px] bg-slate-950/95 md:bg-slate-900/90 backdrop-blur-2xl 
          md:border border-indigo-500/30 md:rounded-[32px] shadow-3xl 
          md:mb-4 flex flex-col overflow-hidden animate-fade-in
        `}>
          <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-indigo-500/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30">
                <SparklesIcon className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <span className="text-white font-black uppercase tracking-widest text-[10px] block leading-none mb-1">AI Agent</span>
                <span className="text-indigo-400 text-[10px] font-bold tracking-wide block leading-none">Online & Thinking</span>
              </div>
            </div>
            <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 rounded-xl bg-slate-800/50 text-slate-400 hover:text-white transition-all active:scale-90"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-[85%] p-4 rounded-[20px] text-sm leading-relaxed shadow-lg ${
                  m.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700/50'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 text-indigo-400 p-4 rounded-[20px] rounded-tl-none border border-slate-700/50 animate-pulse text-[10px] uppercase font-black tracking-widest">
                  Синхронизация...
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-slate-950/80 border-t border-slate-800 shrink-0">
            <div className="relative group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Спросите об AI-маркетологе..."
                className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl py-4 pl-5 pr-14 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 active:scale-95 disabled:opacity-50 transition-all shadow-lg"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[9px] text-center mt-4 text-slate-600 font-bold uppercase tracking-widest">Powered by Gemini 3.0 Flash Preview</p>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
            w-16 h-16 bg-indigo-600 text-white rounded-2xl shadow-premium flex items-center justify-center 
            transition-all duration-300 hover:scale-110 active:scale-90 group
            ${isOpen ? 'hidden md:flex' : 'flex'}
        `}
        aria-label="Открыть чат с AI"
      >
        <ChatBubbleLeftRightIcon className="w-8 h-8 transition-transform group-hover:rotate-12" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full animate-pulse"></div>
      </button>
    </div>
  );
};

export default AiConsultant;
