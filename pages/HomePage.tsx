import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

const HomePage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 sm:p-8 lg:p-12 animate-fade-in border border-gray-200 dark:border-slate-700">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-slate-50 leading-tight mb-4">
          Мои проекты
        </h1>
        <p className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
          Здесь представлены некоторые из моих последних проектов. Нажмите на любой проект, чтобы узнать больше.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link 
            to={`/project/${project.slug}`} 
            key={project.id} 
            className="group block bg-white dark:bg-slate-900 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500"
          >
            <div className="overflow-hidden aspect-video">
              <img
                src={project.imageUrl}
                alt={project.title}
                width="800"
                height="450"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100 mb-2">{project.title}</h2>
              <p className="text-gray-600 dark:text-slate-400 text-sm">{project.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;