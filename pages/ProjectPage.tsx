import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import NotFound from '../components/NotFound';

const renderFeatureWithLinks = (feature: string) => {
    // This regex will split the string by "gpttunnel" or "Omnidesk", keeping the delimiters.
    const parts = feature.split(/(gpttunnel|Omnidesk)/g);

    return parts.map((part, i) => {
        if (part === 'gpttunnel') {
            return <a key={i} href="https://gptunnel.ru/?ref=DEN_PROMO" target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-500 dark:text-indigo-400 hover:underline transition-colors">gpttunnel</a>;
        }
        if (part === 'Omnidesk') {
            return <a key={i} href="https://omnidesk.ru/features/" target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-500 dark:text-indigo-400 hover:underline transition-colors">Omnidesk</a>;
        }
        return part;
    });
};

const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <NotFound
        title="Проект не найден"
        message="К сожалению, мы не смогли найти проект, который вы ищете. Возможно, ссылка устарела или была допущена ошибка в адресе."
        linkText="Посмотреть все проекты"
        linkTo="/"
      />
    );
  }

  return (
    <>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 sm:p-8 lg:p-12 animate-fade-in border border-gray-200 dark:border-slate-700">
        <article>
            <div className="lg:grid lg:grid-cols-3 lg:gap-12">
                
                {/* Image Column */}
                <div className="lg:col-span-1">
                    <div className="lg:sticky lg:top-24">
                        <img
                            src={project.imageUrl}
                            alt={project.title}
                            width="1200"
                            height="675"
                            className="w-full h-auto object-cover rounded-lg shadow-lg mb-8 lg:mb-0"
                        />
                    </div>
                </div>

                {/* Details Column */}
                <div className="lg:col-span-2">
                    <header className="mb-8">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-200 leading-tight mb-4">
                        {project.title}
                        </h1>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                            <span
                                key={tech}
                                className="bg-gray-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm font-medium px-3 py-1 rounded-full"
                            >
                                {tech}
                            </span>
                            ))}
                        </div>
                    </header>

                    <div className="prose prose-lg max-w-none text-gray-700 dark:text-slate-300 dark:prose-headings:text-slate-200 dark:prose-strong:text-slate-200">
                        <p className="lead font-semibold text-xl text-slate-700 dark:text-slate-300">{project.summary}</p>
                        <p>{project.description}</p>
                    </div>

                    {project.keyFeatures && project.keyFeatures.length > 0 && (
                        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-slate-700">
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-200 mb-4">
                                Ключевые особенности
                            </h2>
                            <ul className="space-y-3">
                                {project.keyFeatures.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckBadgeIcon className="flex-shrink-0 h-6 w-6 text-indigo-500 dark:text-indigo-400 mt-1 mr-3" />
                                        <span className="text-lg text-slate-700 dark:text-slate-300">{renderFeatureWithLinks(feature)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="mt-10 pt-6 border-t border-gray-200 dark:border-slate-700 flex flex-wrap gap-4 items-center">
                        {project.documentationPage && (
                        <Link
                            to={project.documentationPage}
                            className="inline-block bg-[var(--color-interactive-primary-strong)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-interactive-primary-strong-hover)] transition-all duration-300 no-underline shadow-sm transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-interactive-primary)] focus-visible:ring-offset-2 ring-offset-[var(--ring-offset-light)] dark:focus-visible:ring-offset-[var(--ring-offset-dark-card)]"
                        >
                            Читать документацию
                        </Link>
                        )}
                        {project.reportPage && (
                            <Link
                                to={project.reportPage}
                                className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 no-underline shadow-sm transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-500/50 focus-visible:ring-offset-2 ring-offset-[var(--ring-offset-light)] dark:focus-visible:ring-offset-[var(--ring-offset-dark-card)]"
                            >
                                Технический отчёт
                            </Link>
                        )}
                        {project.repoUrl && (
                        <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-slate-700 dark:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 dark:hover:bg-slate-600 transition-all duration-300 no-underline shadow-sm transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-interactive-tertiary)] focus-visible:ring-offset-2 ring-offset-[var(--ring-offset-light)] dark:focus-visible:ring-offset-[var(--ring-offset-dark-card)]"
                        >
                            Репозиторий
                        </a>
                        )}
                    </div>
                </div>
            </div>
        </article>
        </div>
    </>
  );
};

export default ProjectPage;