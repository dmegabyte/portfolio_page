import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';
import { projects } from '../data/projects';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  const getBreadcrumbName = (part: string, index: number) => {
    if (part === 'project') return 'Проекты';
    if (part === 'documentation') return 'Документация';
    if (part === 'report') return 'Отчёт';
    if (part === 'about') return 'Обо мне';
    if (part === 'contact') return 'Контакты';
    if (part === 'gallery') return 'Галерея';
    if (part === 'playground') return 'Playground';

    const project = projects.find((p) => p.slug === part);
    if (project) return project.title;

    return part.charAt(0).toUpperCase() + part.slice(1);
  };

  const shouldLinkToHome = (segment: string) => ['documentation', 'report'].includes(segment);

  return (
    <nav aria-label="Breadcrumb" className="mb-6 animate-fade-in">
      <ol className="flex items-center space-x-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">
        <li>
          <Link to="/" className="flex items-center hover:text-indigo-400 transition-colors">
            <HomeIcon className="w-3.5 h-3.5 mr-1" />
            Главная
          </Link>
        </li>
        {pathnames.map((value, index) => {
          if (value === 'project') return null;
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const name = getBreadcrumbName(value, index);

          return (
            <li key={to} className="flex items-center space-x-2">
              <ChevronRightIcon className="w-4 h-4 text-slate-700" />
              {last ? (
                <span className="text-indigo-400/80 truncate max-w-[150px] md:max-w-none" aria-current="page">
                  {name}
                </span>
              ) : (
                <Link
                  to={shouldLinkToHome(value) ? '/' : to}
                  className="hover:text-indigo-400 transition-colors"
                >
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
