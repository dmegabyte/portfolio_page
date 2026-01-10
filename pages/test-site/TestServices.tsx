
import React from 'react';
import { HomeIcon, BriefcaseIcon, EnvelopeIcon, CpuChipIcon, ChartPieIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
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

const TestServices: React.FC = () => {
  const services = [
    { title: 'AI Консалтинг', icon: CpuChipIcon, desc: 'Интеграция LLM в ваши бизнес-процессы.' },
    { title: 'Аналитика', icon: ChartPieIcon, desc: 'Сбор и визуализация данных для принятия решений.' },
    { title: 'Безопасность', icon: ShieldCheckIcon, desc: 'Защита ваших данных и AI-пайплайнов.' }
  ];

  return (
    <div className="animate-fade-in py-12 max-w-6xl mx-auto">
      <TestNavbar />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {services.map((s, i) => (
            <div key={i} className="bg-slate-900/60 backdrop-blur-2xl border border-slate-800 p-10 rounded-[40px] hover:border-indigo-500/50 transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <s.icon className="w-8 h-8 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 uppercase">{s.title}</h3>
                <p className="text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default TestServices;
