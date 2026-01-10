
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';

const SimpleDemoLanding: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
      <div className="max-w-xl w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[40px] p-12 text-center space-y-8 shadow-premium">
        <div className="inline-flex p-4 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mx-auto">
          <SparklesIcon className="w-12 h-12" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-white tracking-tight">ТЕСТОВАЯ СТРАНИЦА 1</h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Это первая страница вашего тестового маршрута. Навигация в React работает через изменение состояния URL без перезагрузки всего документа.
          </p>
        </div>

        <div className="pt-6">
          <Link 
            to="/demo-simple/subpage" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold uppercase tracking-widest transition-all hover:scale-105 shadow-xl shadow-indigo-500/20 group"
          >
            Перейти на страницу 2
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SimpleDemoLanding;
