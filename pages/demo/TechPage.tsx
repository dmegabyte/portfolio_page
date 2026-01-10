
import React from 'react';
import { Link } from 'react-router-dom';
import { CpuChipIcon, ArrowLongRightIcon, ArrowLongLeftIcon } from '@heroicons/react/24/outline';

const TechPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in py-12">
      <div className="max-w-2xl w-full bg-slate-900/60 backdrop-blur-2xl rounded-[40px] border border-slate-800 p-10 md:p-16 shadow-3xl text-center space-y-8">
        <div className="inline-flex p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          <CpuChipIcon className="w-10 h-10" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            Этап 2: <span className="text-emerald-400">Технологии</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Переход между страницами выполнен без перезагрузки. 
            Состояние анимации фона сохраняется, обеспечивая бесшовный UX.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
          <Link 
            to="/demo/vision" 
            className="inline-flex items-center gap-3 px-8 py-5 border border-slate-800 text-slate-400 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 hover:text-white transition-all group"
          >
            <ArrowLongLeftIcon className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
            Назад
          </Link>
          <Link 
            to="/demo/launch" 
            className="inline-flex items-center gap-3 px-10 py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:-translate-y-1 shadow-2xl shadow-emerald-500/20 group"
          >
            К запуску
            <ArrowLongRightIcon className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
        
        <div className="flex justify-center gap-2 pt-4">
          <div className="w-12 h-1.5 rounded-full bg-emerald-500/40"></div>
          <div className="w-12 h-1.5 rounded-full bg-emerald-500"></div>
          <div className="w-12 h-1.5 rounded-full bg-slate-800"></div>
        </div>
      </div>
    </div>
  );
};

export default TechPage;
