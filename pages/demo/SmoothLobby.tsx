
import React from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon } from '@heroicons/react/24/outline';

const SmoothLobby: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="max-w-2xl w-full text-center space-y-12 animate-[fadeIn_3s_ease-out]">
        <div className="inline-flex p-8 rounded-full bg-indigo-500/5 border border-indigo-500/10 text-indigo-400/50 mx-auto">
          <SparklesIcon className="w-16 h-16 animate-pulse" />
        </div>
        
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-light text-white tracking-[0.2em] uppercase opacity-80">
            Растворение
          </h1>
          <p className="text-slate-500 text-xl font-medium tracking-wide leading-relaxed">
            Посмотрите на звезды позади этого текста. Они рождаются и гаснут почти незаметно. Здесь нет места резкости.
          </p>
        </div>

        <div className="pt-12">
          <Link 
            to="/smooth-demo/deep" 
            className="px-12 py-5 border border-slate-800 text-slate-500 rounded-full font-bold uppercase tracking-[0.3em] text-xs hover:bg-white/5 hover:text-white hover:border-white/10 transition-all duration-1000"
          >
            Погрузиться глубже
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmoothLobby;
