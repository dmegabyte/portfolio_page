
import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import {
    HomeIcon,
    UserIcon,
    EnvelopeIcon,
    PhotoIcon,
    CommandLineIcon,
    BookOpenIcon,
    BeakerIcon,
    DocumentTextIcon,
    MapIcon,
    Square3Stack3DIcon,
    ChartBarIcon,
    UserGroupIcon,
    ChatBubbleLeftRightIcon,
    BugAntIcon,
    ShieldCheckIcon,
    CubeTransparentIcon,
    CodeBracketIcon,
    ArrowUpRightIcon
} from '@heroicons/react/24/outline';

/**
 * Helper to get icons for projects dynamically
 */
const getProjectIcon = (slug: string) => {
    switch (slug) {
        case 'client-segmentation': return UserGroupIcon;
        case 'interface-generator': return CommandLineIcon;
        case 'gpt-assistant': return ChatBubbleLeftRightIcon;
        case 'bot-autotest': return BugAntIcon;
        case 'visual-bot-testing': return ShieldCheckIcon;
        case 'scenario-nexus': return CubeTransparentIcon;
        default: return CodeBracketIcon;
    }
};

/**
 * UniversalNavCard - Версия "Strict Matte".
 * Полностью удалены эффекты свечения (подсветки). 
 * Акцент только на контенте и движении.
 */
interface UniversalNavCardProps {
    to: string;
    icon: React.ElementType;
    title: string;
    desc: string;
    tags?: string[];
    color?: 'indigo' | 'emerald' | 'sky' | 'pink' | 'violet' | 'amber';
    secondaryLinks?: { label: string; to: string; icon?: React.ElementType }[];
}

const UniversalNavCard: React.FC<UniversalNavCardProps> = ({
    to,
    icon: Icon,
    title,
    desc,
    tags = [],
    color = 'indigo',
    secondaryLinks = []
}) => {

    // Minimalist styles - Text colors only
    const colorStyles = {
        indigo: {
            iconText: 'text-indigo-400 group-hover:text-indigo-300',
            iconBox: 'border-indigo-500/20 group-hover:border-indigo-400/40',
            tag: 'group-hover:border-indigo-500/30 group-hover:text-indigo-300',
            link: 'hover:text-indigo-300'
        },
        emerald: {
            iconText: 'text-emerald-400 group-hover:text-emerald-300',
            iconBox: 'border-emerald-500/20 group-hover:border-emerald-400/40',
            tag: 'group-hover:border-emerald-500/30 group-hover:text-emerald-300',
            link: 'hover:text-emerald-300'
        },
        sky: {
            iconText: 'text-sky-400 group-hover:text-sky-300',
            iconBox: 'border-sky-500/20 group-hover:border-sky-400/40',
            tag: 'group-hover:border-sky-500/30 group-hover:text-sky-300',
            link: 'hover:text-sky-300'
        },
        pink: {
            iconText: 'text-pink-400 group-hover:text-pink-300',
            iconBox: 'border-pink-500/20 group-hover:border-pink-400/40',
            tag: 'group-hover:border-pink-500/30 group-hover:text-pink-300',
            link: 'hover:text-pink-300'
        },
        violet: {
            iconText: 'text-violet-400 group-hover:text-violet-300',
            iconBox: 'border-violet-500/20 group-hover:border-violet-400/40',
            tag: 'group-hover:border-violet-500/30 group-hover:text-violet-300',
            link: 'hover:text-violet-300'
        },
        amber: {
            iconText: 'text-amber-400 group-hover:text-amber-300',
            iconBox: 'border-amber-500/20 group-hover:border-amber-400/40',
            tag: 'group-hover:border-amber-500/30 group-hover:text-amber-300',
            link: 'hover:text-amber-300'
        },
    };

    const style = colorStyles[color];

    return (
        <div className={`
            group relative flex flex-col h-full 
            bg-[#0F111A]
            rounded-[32px] p-8 border border-slate-800
            transition-all duration-300 ease-out 
            hover:-translate-y-1
        `}>

            {/* Clickable Area for Main Link */}
            <Link to={to} className="flex-grow flex flex-col relative z-10">
                {/* Icon Box */}
                <div className={`
                    w-14 h-14 rounded-2xl flex items-center justify-center mb-6 
                    bg-slate-900/50 border
                    transition-colors duration-300 ease-out
                    ${style.iconBox}
                `}>
                    <Icon className={`w-7 h-7 transition-colors duration-300 ${style.iconText}`} />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-white transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8 group-hover:text-slate-300 transition-colors">
                    {desc}
                </p>

                {/* Tags Row */}
                {tags.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-2">
                        {tags.slice(0, 3).map((tag, idx) => (
                            <span
                                key={idx}
                                className={`
                                    px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 
                                    text-[10px] font-bold uppercase tracking-wider text-slate-500 
                                    transition-all duration-300
                                    ${style.tag}
                                `}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </Link>

            {/* Secondary Links (Footer) */}
            {secondaryLinks.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-800/50 flex gap-4 relative z-10">
                    {secondaryLinks.map((link, idx) => (
                        <Link
                            key={idx}
                            to={link.to}
                            className={`
                                flex items-center gap-2 text-xs font-bold uppercase tracking-wider 
                                text-slate-500 transition-colors duration-300
                                ${style.link}
                            `}
                        >
                            {link.icon && <link.icon className="w-3.5 h-3.5" />}
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}

            {/* Hover Decor - Top Right Arrow */}
            <div className={`absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 ${style.iconText}`}>
                <ArrowUpRightIcon className="w-5 h-5" />
            </div>
        </div>
    );
};

const NavigationDemoPage: React.FC = () => {

    const mainRoutes = [
        { name: 'Главная', path: '/', icon: HomeIcon, desc: 'Обзор портфолио и ключевых кейсов', color: 'indigo' },
        { name: 'Обо мне', path: '/about', icon: UserIcon, desc: 'Компетенции, стек и биография', color: 'sky' },
        { name: 'Галерея', path: '/gallery', icon: PhotoIcon, desc: 'LOD-оптимизированные визуализации', color: 'pink' },
        { name: 'Контакты', path: '/contact', icon: EnvelopeIcon, desc: 'Связь и социальные сети', color: 'emerald' },
    ];

    const systemRoutes = [
        { name: 'Playground', path: '/playground', icon: BeakerIcon, desc: 'Лаборатория UI-экспериментов', color: 'violet' },
        { name: 'UI Components', path: '/documentation/ui-components', icon: Square3Stack3DIcon, desc: 'Дизайн-система проекта', color: 'indigo' },
        { name: 'Typography', path: '/documentation/ui-components/typography', icon: DocumentTextIcon, desc: 'Руководство по шрифтам', color: 'sky' },
    ];

    // Helper to determine color based on index
    const getColor = (idx: number) => {
        const colors = ['indigo', 'emerald', 'sky', 'pink', 'violet', 'amber'] as const;
        return colors[idx % colors.length];
    };

    return (
        <div className="animate-fade-in py-12 md:py-24">
            {/* Header Section */}
            <div className="text-center max-w-4xl mx-auto px-4 mb-24 relative">

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full bg-[#0B0F19] border border-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-[0.25em] shadow-xl">
                        <MapIcon className="w-4 h-4" />
                        System Architecture
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-white leading-none mb-8 tracking-tight">
                        КАРТА <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-sky-400">
                            НАВИГАЦИИ
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                        Полная структура приложения. Доступ к документации, отчетам и системным компонентам через единый интерфейс.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 space-y-24">

                {/* 1. Main Sections */}
                <section>
                    <div className="flex items-center gap-4 mb-10 pl-2">
                        <span className="text-indigo-500 font-black text-sm tracking-widest">01.</span>
                        <h2 className="text-3xl font-bold text-white tracking-tight">Основные разделы</h2>
                        <div className="h-px bg-slate-800 flex-grow ml-4"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {mainRoutes.map((route) => (
                            <UniversalNavCard
                                key={route.path}
                                to={route.path}
                                icon={route.icon}
                                title={route.name}
                                desc={route.desc}
                                color={route.color as any}
                            />
                        ))}
                    </div>
                </section>

                {/* 2. Projects & Docs */}
                <section>
                    <div className="flex items-center gap-4 mb-10 pl-2">
                        <span className="text-emerald-500 font-black text-sm tracking-widest">02.</span>
                        <h2 className="text-3xl font-bold text-white tracking-tight">Проекты и Документация</h2>
                        <div className="h-px bg-slate-800 flex-grow ml-4"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, idx) => {
                            const secondaryLinks = [];
                            if (project.documentationPage) secondaryLinks.push({ label: 'Docs', to: project.documentationPage, icon: BookOpenIcon });
                            if (project.reportPage) secondaryLinks.push({ label: 'Report', to: project.reportPage, icon: ChartBarIcon });

                            return (
                                <UniversalNavCard
                                    key={project.slug}
                                    to={`/project/${project.slug}`}
                                    icon={getProjectIcon(project.slug)}
                                    title={project.title}
                                    desc={project.summary}
                                    tags={project.technologies}
                                    color={getColor(idx)}
                                    secondaryLinks={secondaryLinks}
                                />
                            );
                        })}
                    </div>
                </section>

                {/* 3. System Pages */}
                <section>
                    <div className="flex items-center gap-4 mb-10 pl-2">
                        <span className="text-violet-500 font-black text-sm tracking-widest">03.</span>
                        <h2 className="text-3xl font-bold text-white tracking-tight">Системные страницы</h2>
                        <div className="h-px bg-slate-800 flex-grow ml-4"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {systemRoutes.map((route) => (
                            <UniversalNavCard
                                key={route.path}
                                to={route.path}
                                icon={route.icon}
                                title={route.name}
                                desc={route.desc}
                                color={route.color as any}
                            />
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default NavigationDemoPage;
