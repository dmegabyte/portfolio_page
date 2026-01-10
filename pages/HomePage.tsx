
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import {
    CommandLineIcon,
    ChatBubbleLeftRightIcon,
    ShieldCheckIcon,
    UserGroupIcon,
    BugAntIcon,
    CodeBracketIcon,
    SparklesIcon,
    CubeTransparentIcon,
    EyeIcon
} from '@heroicons/react/24/outline';

const getProjectIcon = (slug: string) => {
    switch (slug) {
        case 'client-segmentation': return <UserGroupIcon className="w-10 h-10" />;
        case 'interface-generator': return <CommandLineIcon className="w-10 h-10" />;
        case 'gpt-assistant': return <ChatBubbleLeftRightIcon className="w-10 h-10" />;
        case 'bot-autotest': return <BugAntIcon className="w-10 h-10" />;
        case 'visual-bot-testing': return <EyeIcon className="w-10 h-10" />;
        case 'scenario-nexus': return <CubeTransparentIcon className="w-10 h-10" />;
        default: return <CodeBracketIcon className="w-10 h-10" />;
    }
};

const getThemeColors = (slug: string) => {
    switch (slug) {
        case 'client-segmentation':
            return {
                iconColor: 'text-emerald-400 group-hover:text-emerald-300',
                badge: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5',
                border: 'group-hover:border-emerald-500/40',
                iconBox: 'group-hover:bg-emerald-500/10',
                glow: 'group-hover:shadow-[0_20px_50px_-12px_rgba(16,185,129,0.15)]'
            };
        case 'interface-generator':
            return {
                iconColor: 'text-indigo-400 group-hover:text-indigo-300',
                badge: 'border-indigo-500/20 text-indigo-400 bg-indigo-500/5',
                border: 'group-hover:border-indigo-500/40',
                iconBox: 'group-hover:bg-indigo-500/10',
                glow: 'group-hover:shadow-[0_20px_50px_-12px_rgba(99,102,241,0.15)]'
            };
        case 'scenario-nexus':
            return {
                iconColor: 'text-violet-400 group-hover:text-violet-300',
                badge: 'border-violet-500/20 text-violet-400 bg-violet-500/5',
                border: 'group-hover:border-violet-500/40',
                iconBox: 'group-hover:bg-violet-500/10',
                glow: 'group-hover:shadow-[0_20px_50px_-12px_rgba(139,92,246,0.15)]'
            };
        case 'visual-bot-testing':
            return {
                iconColor: 'text-sky-400 group-hover:text-sky-300',
                badge: 'border-sky-500/20 text-sky-400 bg-sky-500/5',
                border: 'group-hover:border-sky-500/40',
                iconBox: 'group-hover:bg-sky-500/10',
                glow: 'group-hover:shadow-[0_20px_50px_-12px_rgba(14,165,233,0.15)]'
            };
        default:
            return {
                iconColor: 'text-sky-400 group-hover:text-sky-300',
                badge: 'border-sky-500/20 text-sky-400 bg-sky-500/5',
                border: 'group-hover:border-sky-500/40',
                iconBox: 'group-hover:bg-sky-500/10',
                glow: 'group-hover:shadow-[0_20px_50px_-12px_rgba(14,165,233,0.15)]'
            };
    }
}

const ProjectCard = React.memo(({ project }: { project: any }) => {
    const theme = getThemeColors(project.slug);
    const iconElement = getProjectIcon(project.slug);

    const handleMouseEnter = useCallback(() => {
        if (project.imageUrl) {
            const img = new Image();
            img.src = project.imageUrl;
        }
    }, [project.imageUrl]);

    return (
        <Link
            to={`/project/${project.slug}`}
            className={`
                group relative flex flex-col h-full 
                bg-slate-900/60 backdrop-blur-md
                rounded-[40px] p-8 md:p-10 
                border border-slate-800
                transition-all duration-500 cubic-bezier(0.2, 0.8, 0.2, 1)
                transform-gpu
                ${theme.border}
                ${theme.glow}
                hover:-translate-y-3 hover:scale-[1.01]
            `}
            onMouseEnter={handleMouseEnter}
        >
            <div className="mb-10">
                <div className={`
                    inline-flex p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50 
                    transition-all duration-300 
                    ${theme.iconBox}
                `}>
                    <div className={`transition-colors duration-300 ${theme.iconColor}`}>
                        {iconElement}
                    </div>
                </div>
            </div>

            <div className="flex-grow space-y-4">
                <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight transition-colors">
                    {project.title}
                </h2>
                <p className="text-slate-300 text-base md:text-lg leading-relaxed line-clamp-3 font-medium transition-colors">
                    {project.summary}
                </p>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-800/50 flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map((tech: string) => (
                    <span
                        key={tech}
                        className={`
                            inline-flex items-center px-3 py-1 rounded-lg 
                            text-[10px] font-bold uppercase tracking-widest
                            border transition-colors duration-300
                            ${theme.badge}
                        `}
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </Link>
    );
});

const HomePage: React.FC = () => {
    return (
        <div className="animate-fade-in space-y-24 py-12 md:py-24">

            {/* Hero Section */}
            <div className="text-center max-w-5xl mx-auto px-4 relative">
                <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-slate-900/80 border border-indigo-500/20 text-indigo-300 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] shadow-xl">
                    <SparklesIcon className="w-4 h-4" />
                    Principal AI Solutions Architect
                </div>

                <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-white leading-none mb-10 tracking-tight">
                    АРХИТЕКТУРА <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400">
                        ИНТЕЛЛЕКТА
                    </span>
                </h1>
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 px-4 max-w-7xl mx-auto pb-12">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>

        </div>
    );
};

export default HomePage;
