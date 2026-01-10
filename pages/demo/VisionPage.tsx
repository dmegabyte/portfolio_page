
import React from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline';

const VisionPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in py-12">
      <div className="max-w-2xl w-full bg-slate-900/60 backdrop-blur-2xl rounded-[40px] border border-slate-800 p-10 md:p-16 shadow-3xl text-center space-y-8">
        <div className="inline-flex p-4 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
          <SparklesIcon className="w-10 h-10" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            Этап 1: <span className="text-indigo-400">Видение</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Добро пожаловать на тестовый многостраничный маршрут. 
            Здесь мы демонстрируем работу <code className="text-indigo-300">HashRouter</code> в реальном времени.
          </p>
        </div>

        <div className="pt-8">
          <Link 
            to="/demo/tech" 
            className="inline-flex items-center gap-3 px-10 py-5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:-translate-y-1 shadow-2xl shadow-indigo-500/20 group"
          >
            К технологиям
            <ArrowLongRightIcon className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
        
        <div className="flex justify-center gap-2 pt-4">
          <div className="w-12 h-1.5 rounded-full bg-indigo-500"></div>
          <div className="w-12 h-1.5 rounded-full bg-slate-800"></div>
          <div className="w-12 h-1.5 rounded-full bg-slate-800"></div>
        </div>
      </div>
    </div>
  );
};

export default VisionPage;
