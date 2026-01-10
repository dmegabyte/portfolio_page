
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

const SimpleDemoSubpage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
      <div className="max-w-xl w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[40px] p-12 text-center space-y-8 shadow-premium">
        <div className="inline-flex p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto">
          <RocketLaunchIcon className="w-12 h-12" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-white tracking-tight">ТЕСТОВАЯ СТРАНИЦА 2</h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Вы успешно перешли на вторую страницу! Заметьте, что анимация фона `NeuralBackground` не прервалась, так как мы находимся в рамках SPA.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-3 px-8 py-4 border border-slate-700 text-slate-300 rounded-2xl font-bold uppercase tracking-widest hover:bg-slate-800 transition-all"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Назад
          </button>
          <Link 
            to="/demo-simple" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-slate-800 text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-slate-700 transition-all"
          >
            К началу демо
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SimpleDemoSubpage;
