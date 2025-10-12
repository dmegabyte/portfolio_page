
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { projects } from '../data/projects';

const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    // Or return a 404 component
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 sm:p-8 lg:p-12 animate-fade-in border border-gray-200 dark:border-slate-700">
      <article>
        <header className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-slate-50 leading-tight mb-4">
            {project.title}
            </h1>
            <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                <span
                    key={tech}
                    className="bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-slate-200 text-sm font-medium px-3 py-1 rounded-full"
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

        <div className="prose prose-lg max-w-none text-gray-700 dark:text-slate-300 dark:prose-headings:text-slate-100 dark:prose-strong:text-slate-100">
          <p className="lead font-semibold text-xl text-gray-800 dark:text-slate-200">{project.summary}</p>
          <p>{project.description}</p>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-slate-700 flex flex-wrap gap-4">
            {project.documentationPage && (
            <Link
                to={project.documentationPage}
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors no-underline shadow-sm"
            >
                Читать документацию
            </Link>
            )}
            {project.repoUrl && (
            <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-slate-700 dark:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors no-underline shadow-sm"
            >
                Репозиторий
            </a>
            )}
        </div>
      </article>
    </div>
  );
};

export default ProjectPage;
