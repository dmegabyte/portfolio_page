
import React, { useState } from 'react';
import { 
    BeakerIcon, 
    ArrowPathIcon, 
    ArrowsRightLeftIcon, 
    SparklesIcon,
    CpuChipIcon,
    RocketLaunchIcon,
    ChartBarIcon,
    ShieldCheckIcon,
    UserGroupIcon,
    CommandLineIcon
} from '@heroicons/react/24/outline';

const PlaygroundPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { id: 1, title: 'Анализ', icon: ChartBarIcon, color: 'indigo' },
    { id: 2, title: 'Нейросеть', icon: CpuChipIcon, color: 'emerald' },
    { id: 3, title: 'Запуск', icon: RocketLaunchIcon, color: 'sky' }
  ];

  const renderContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="animate-fade-in space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="inline-flex gap-2 p-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                  {['GOOGLE APPS SCRIPT', 'GOOGLE SHEETS', 'JAVASCRIPT'].map(tech => (
                    <span key={tech} className="px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-none">
                  AI-маркетолог
                </h2>
                <p className="text-xl text-slate-300 font-medium leading-relaxed">
                  Автоматическая сегментация клиентов и генерация персональных рассылок. Система анализирует базу по 7+ параметрам.
                </p>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-indigo-500/20 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-slate-800 rounded-[32px] border border-slate-700 p-4 aspect-video overflow-hidden">
                   <div className="flex h-full items-end gap-2">
                      {[40, 70, 45, 90, 65, 80, 50, 95].map((h, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-indigo-600 to-sky-400 rounded-t-lg transition-all duration-700" style={{ height: `${h}%` }}></div>
                      ))}
                   </div>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-slate-800">
               <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <ShieldCheckIcon className="w-8 h-8 text-indigo-500" />
                  Ключевые особенности
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Многофакторная сегментация клиентской базы",
                    "Автоматический подбор промо-акций",
                    "Предиктивный расчет оптимальной даты отправки",
                    "Полная автоматизация через WAHelp API"
                  ].map((feature, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/40 transition-colors flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                        <span className="text-slate-300 font-medium">{feature}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="animate-fade-in space-y-8">
            <h2 className="text-4xl font-black text-emerald-400 tracking-tight leading-none">Слой принятия решений</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 text-center space-y-4">
                    <UserGroupIcon className="w-12 h-12 text-emerald-500 mx-auto" />
                    <h4 className="text-white font-bold text-xl">Сегментация</h4>
                    <p className="text-slate-400 text-sm">Классификация по ID категории согласно принципу idFirst.</p>
                </div>
                <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 text-center space-y-4">
                    <CommandLineIcon className="w-12 h-12 text-emerald-500 mx-auto" />
                    <h4 className="text-white font-bold text-xl">Генерация</h4>
                    <p className="text-slate-400 text-sm">Динамическая сборка шаблонов с плейсхолдерами.</p>
                </div>
                <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 text-center space-y-4">
                    <ArrowsRightLeftIcon className="w-12 h-12 text-emerald-500 mx-auto" />
                    <h4 className="text-white font-bold text-xl">Маршрутизация</h4>
                    <p className="text-slate-400 text-sm">Выбор канала связи в зависимости от активности.</p>
                </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="animate-fade-in flex flex-col items-center justify-center text-center space-y-8 py-12">
            <div className="w-24 h-24 rounded-full bg-sky-500/20 border border-sky-500/40 flex items-center justify-center animate-pulse">
                <RocketLaunchIcon className="w-12 h-12 text-sky-400" />
            </div>
            <div className="max-w-xl space-y-4">
                <h2 className="text-4xl font-black text-white tracking-tight leading-none uppercase">Система готова к деплою</h2>
                <p className="text-slate-400 text-lg">Все тесты пройдены. Модули автоматизации синхронизированы с Google Workspace API.</p>
            </div>
            <button className="px-12 py-5 bg-gradient-to-r from-indigo-600 to-sky-500 text-white rounded-2xl font-black text-lg uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl shadow-indigo-500/20">
                АКТИВИРОВАТЬ РАССЫЛКУ
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 space-y-16">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            <BeakerIcon className="w-4 h-4 text-indigo-500" />
            Vibe-Coding Simulation Environment
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight leading-none">
            ИНТЕРФЕЙС <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">ПРОТОТИПА</span>
        </h1>
      </header>

      <div className="bg-slate-900/40 backdrop-blur-3xl border border-slate-800 rounded-[48px] overflow-hidden shadow-3xl">
        <div className="flex flex-col md:flex-row border-b border-slate-800">
            {steps.map(step => (
                <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`
                        flex-1 flex items-center justify-center gap-4 py-8 px-6 transition-all duration-500
                        ${activeStep === step.id 
                            ? `bg-${step.color}-500/10 text-${step.color}-400` 
                            : 'text-slate-500 hover:text-white hover:bg-white/5'
                        }
                    `}
                >
                    <step.icon className={`w-6 h-6 ${activeStep === step.id ? 'animate-bounce' : ''}`} />
                    <span className="font-black text-xs uppercase tracking-widest">{step.title}</span>
                </button>
            ))}
        </div>

        <div className="p-8 md:p-16 min-h-[500px]">
            {renderContent()}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-slate-800">
          <div className="space-y-1">
              <span className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest">Статус</span>
              <span className="text-emerald-500 font-black">ACTIVE.STABLE</span>
          </div>
          <div className="space-y-1">
              <span className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest">Версия</span>
              <span className="text-white font-black">v4.8.1-demo</span>
          </div>
          <div className="space-y-1">
              <span className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest">Ядро</span>
              <span className="text-indigo-400 font-black">NEXUS-A1</span>
          </div>
          <div className="space-y-1">
              <span className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest">Задержка</span>
              <span className="text-white font-black">12ms</span>
          </div>
      </div>
    </div>
  );
};

export default PlaygroundPage;
