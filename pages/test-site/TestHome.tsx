
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HomeIcon, BriefcaseIcon, EnvelopeIcon, SparklesIcon } from '@heroicons/react/24/outline';

const TestNavbar = () => (
    <nav className="flex justify-center gap-4 mb-12">
        {[
            { name: 'Главная', to: '/test-site', icon: HomeIcon },
            { name: 'Услуги', to: '/test-site/services', icon: BriefcaseIcon },
            { name: 'Контакты', to: '/test-site/contact', icon: EnvelopeIcon },
        ].map((item) => (
            <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) => `
                    flex items-center gap-2 px-6 py-3 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all
                    ${isActive 
                        ? 'bg-indigo-500 text-white shadow-xl shadow-indigo-500/20 scale-105' 
                        : 'bg-slate-900/50 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-white'}
                `}
            >
                <item.icon className="w-4 h-4" />
                {item.name}
            </NavLink>
        ))}
    </nav>
);

const TestHome: React.FC = () => {
  return (
    <div className="animate-fade-in py-12 max-w-4xl mx-auto">
      <TestNavbar />
      
      <div className="bg-slate-900/60 backdrop-blur-3xl rounded-[48px] border border-slate-800 p-12 md:p-20 text-center shadow-3xl">
        <div className="inline-flex p-4 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-8">
            <SparklesIcon className="w-12 h-12" />
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            ГЛАВНАЯ <br /> <span className="text-indigo-400">ТЕСТОВАЯ</span>
        </h1>
        <p className="text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
            Это пример многостраничности в SPA. Переход между вкладками выше происходит мгновенно, без перезагрузки страницы.
        </p>
        <Link 
            to="/test-site/services" 
            className="inline-block px-12 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all hover:scale-105"
        >
            Смотреть услуги
        </Link>
      </div>
    </div>
  );
};

export default TestHome;
