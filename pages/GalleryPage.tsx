
import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { ArrowUpRightIcon } from '@heroicons/react/24/solid';

const GalleryPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 sm:p-8 lg:p-12 animate-fade-in border border-gray-200 dark:border-slate-700">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-200 leading-tight mb-4">
          Галерея проектов
        </h1>
        <p className="text-lg text-slate-700 dark:text-slate-400 max-w-2xl mx-auto">
          Визуальная коллекция изображений, представляющих мои проекты. Каждое изображение — это ссылка на страницу с подробным описанием.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link 
            to={`/project/${project.slug}`} 
            key={project.id} 
            className="group relative block bg-slate-900 rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-interactive-primary)] focus-visible:ring-offset-2 ring-offset-[var(--ring-offset-light)] dark:focus-visible:ring-offset-[var(--ring-offset-dark-card)]"
            aria-label={`Подробнее о проекте ${project.title}`}
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              width="800"
              height="450"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
              <h2 className="text-xl font-bold text-white mb-1">{project.title}</h2>
              <p className="text-slate-300 text-sm flex items-center">
                Подробнее
                <ArrowUpRightIcon className="w-4 h-4 ml-1 transform -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
