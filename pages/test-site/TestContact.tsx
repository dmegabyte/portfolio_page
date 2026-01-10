
import React from 'react';
import { HomeIcon, BriefcaseIcon, EnvelopeIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';

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

const TestContact: React.FC = () => {
  return (
    <div className="animate-fade-in py-12 max-w-4xl mx-auto">
      <TestNavbar />
      
      <div className="bg-slate-900/60 backdrop-blur-3xl rounded-[48px] border border-slate-800 p-12 md:p-16 shadow-3xl">
        <h2 className="text-4xl font-black text-white mb-8 text-center uppercase tracking-tight">Напишите нам</h2>
        
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                    type="text" 
                    placeholder="Ваше имя" 
                    className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
            </div>
            <textarea 
                placeholder="Сообщение" 
                rows={4}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl p-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
            ></textarea>
            <button className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3">
                <PaperAirplaneIcon className="w-5 h-5" />
                Отправить запрос
            </button>
        </form>
      </div>
    </div>
  );
};

export default TestContact;
