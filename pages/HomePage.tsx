import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

const HomePage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 sm:p-8 lg:p-12 animate-fade-in border border-gray-200 dark:border-slate-700">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-200 leading-tight mb-4">
          Мои проекты
        </h1>
        <p className="text-lg text-slate-700 dark:text-slate-400 max-w-2xl mx-auto">
          Здесь представлены некоторые из моих последних проектов. Нажмите на любой проект, чтобы узнать больше.
        </p>
      </div>
      {/* UPDATED: Changed grid to be 1-col on mobile, 2-col on sm, 3-col on lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projects.map((project) => (
          <Link 
            to={`/project/${project.slug}`} 
            key={project.id} 
            className="group relative block bg-white dark:bg-slate-900 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-slate-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-interactive-primary)] focus-visible:ring-offset-2 ring-offset-[var(--ring-offset-light)] dark:focus-visible:ring-offset-[var(--ring-offset-dark-card)]
                       md:transform md:hover:-translate-y-1 md:hover:scale-105"
            aria-label={`Подробнее о проекте ${project.title}`}
          >
            {/* Image Container: aspect-square on mobile, aspect-video on desktop */}
            <div className="overflow-hidden aspect-square md:aspect-video">
              <img
                src={project.imageUrl}
                alt={project.title}
                width="800"
                height="450"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transform md:group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Mobile Overlay & Title (hidden on md and up) */}
            <div className="md:hidden absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" aria-hidden="true" />
            {/* UPDATED: Increased padding */}
            <div className="md:hidden absolute bottom-0 left-0 right-0 p-4">
                {/* UPDATED: Removed truncate, increased font size */}
                <h2 className="font-bold text-white text-lg leading-tight text-shadow-strong">{project.title}</h2>
            </div>

            {/* Desktop Text (hidden on mobile) */}
            <div className="hidden md:block p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-200 mb-2">{project.title}</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{project.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;