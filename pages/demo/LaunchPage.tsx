
import React from 'react';
import { Link } from 'react-router-dom';
import { RocketLaunchIcon, HomeIcon } from '@heroicons/react/24/outline';

const LaunchPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in py-12">
      <div className="max-w-2xl w-full bg-slate-900/60 backdrop-blur-2xl rounded-[40px] border border-slate-800 p-10 md:p-16 shadow-3xl text-center space-y-8">
        <div className="inline-flex p-4 rounded-3xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
          <RocketLaunchIcon className="w-10 h-10 animate-bounce" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            Этап 3: <span className="text-sky-400">Запуск</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Тест навигации завершен успешно. Вы прошли через три уникальных маршрута, 
            поддерживая целостность визуальной среды.
          </p>
        </div>

        <div className="pt-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-indigo-600 to-sky-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 shadow-2xl shadow-sky-500/20 group"
          >
            <HomeIcon className="w-5 h-5" />
            Вернуться домой
          </Link>
        </div>
        
        <div className="flex justify-center gap-2 pt-4">
          <div className="w-12 h-1.5 rounded-full bg-sky-500/40"></div>
          <div className="w-12 h-1.5 rounded-full bg-sky-500/40"></div>
          <div className="w-12 h-1.5 rounded-full bg-sky-500"></div>
        </div>
      </div>
    </div>
  );
};

export default LaunchPage;
