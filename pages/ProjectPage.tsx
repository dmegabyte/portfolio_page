import React, { useState } from 'react';
// FIX: In react-router-dom v6, `Redirect` is replaced by `Navigate`.
import { useParams, Link, Navigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { Modal } from '../components/DocumentationUIComponents';
import GptAssistantReport from '../components/GptAssistantReport';

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
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  if (!project) {
    // Or return a 404 component
    // FIX: In react-router-dom v6, `Redirect` is replaced by `Navigate`.
    return <Navigate to="/" />;
  }

  return (
    <>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 sm:p-8 lg:p-12 animate-fade-in border border-gray-200 dark:border-slate-700">
        <article>
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

            <img
            src={project.imageUrl}
            alt={project.title}
            width="1200"
            height="675"
            className="w-full h-auto max-h-[32rem] object-cover rounded-lg shadow-lg mb-8"
            />

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
                {project.slug === 'gpt-assistant' && (
                <button
                    type="button"
                    onClick={() => setIsReportModalOpen(true)}
                    className="inline-block bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-700 transition-all duration-300 no-underline shadow-sm transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-interactive-secondary)] focus-visible:ring-offset-2 ring-offset-[var(--ring-offset-light)] dark:focus-visible:ring-offset-[var(--ring-offset-dark-card)]"
                >
                    Технический отчёт
                </button>
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
        </article>
        </div>
        {isReportModalOpen && project.slug === 'gpt-assistant' && (
            <Modal
            isOpen={isReportModalOpen}
            onClose={() => setIsReportModalOpen(false)}
            title="🧠 GPT-ассистент: Технический отчёт и история развития"
            >
            <GptAssistantReport />
            </Modal>
        )}
    </>
  );
};

export default ProjectPage;
