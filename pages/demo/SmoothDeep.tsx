
import React from 'react';
import { Link } from 'react-router-dom';

const SmoothDeep: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="max-w-3xl w-full text-center space-y-16 animate-[fadeIn_4s_ease-in-out]">
        <h2 className="text-4xl md:text-5xl font-extralight text-indigo-200 tracking-[0.4em] uppercase">
          Глубина Света
        </h2>
        
        <p className="text-slate-400 text-lg md:text-xl leading-loose font-light italic">
          Переход между страницами не прерывает танец света. 
          Алгоритм продолжает вычислять каждую микро-нить, 
          создавая ощущение бесконечного пространства.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-8 pt-10">
          <Link 
            to="/smooth-demo" 
            className="text-slate-600 hover:text-indigo-400 font-black uppercase tracking-widest text-[10px] transition-colors duration-1000"
          >
            Вернуться в лобби
          </Link>
          <Link 
            to="/" 
            className="text-slate-600 hover:text-emerald-400 font-black uppercase tracking-widest text-[10px] transition-colors duration-1000"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmoothDeep;
