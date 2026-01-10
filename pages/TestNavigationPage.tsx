
import React from 'react';
import { Link } from 'react-router-dom';
import { 
    ArrowsRightLeftIcon, 
    HomeIcon, 
    UserIcon, 
    EnvelopeIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';

/**
 * TestNavigationPage - Демонстрационная страница для проверки многостраничной навигации.
 * См. раздел 🧭 Руководящие принципы — пункт 2: UX как основа.
 */
const TestNavigationPage: React.FC = () => {
    const navItems = [
        { name: 'Главная', to: '/', icon: HomeIcon, color: 'indigo' },
        { name: 'Обо мне', to: '/about', icon: UserIcon, color: 'sky' },
        { name: 'Контакты', to: '/contact', icon: EnvelopeIcon, color: 'emerald' },
    ];

    return (
        <div className="animate-fade-in py-12 md:py-24">
            <div className="text-center max-w-4xl mx-auto px-4 mb-16">
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-widest">
                    <SparklesIcon className="w-4 h-4" />
                    Multi-Page Navigation Test
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8">
                    ТЕСТОВАЯ <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">НАВИГАЦИИ</span>
                </h1>
                <p className="text-xl text-slate-400 font-medium">
                    Эта страница создана для демонстрации корректной работы маршрутизации `HashRouter` в многостраничном React-приложении.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
                {navItems.map((item) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        className="group bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-[32px] p-8 hover:border-indigo-500/50 transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center shadow-2xl"
                    >
                        <div className={`p-5 rounded-2xl bg-${item.color}-500/10 border border-${item.color}-500/20 mb-6 group-hover:scale-110 transition-transform`}>
                            <item.icon className={`w-10 h-10 text-${item.color}-400`} />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2">{item.name}</h3>
                        <p className="text-slate-500 text-sm">Нажмите для перехода на страницу {item.name.toLowerCase()}.</p>
                        <div className="mt-6 flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                            Перейти <ArrowsRightLeftIcon className="w-4 h-4" />
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-24 p-8 max-w-3xl mx-auto bg-slate-900/40 border border-slate-800 rounded-[40px] text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Как это работает?</h2>
                <p className="text-slate-400 leading-relaxed">
                    Приложение использует библиотеку <code>react-router-dom</code> с компонентом <code>HashRouter</code>. 
                    Это позволяет имитировать многостраничность в рамках одного <code>index.html</code>, что идеально подходит для статических хостингов, 
                    где отсутствует серверная переадресация путей.
                </p>
            </div>
        </div>
    );
};

export default TestNavigationPage;
