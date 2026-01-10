
import React, { Suspense, lazy } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import {
  CheckBadgeIcon,
  BookOpenIcon,
  ChartBarIcon,
  CodeBracketIcon,
  LightBulbIcon,
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  DocumentTextIcon,
  PlayCircleIcon,
  GlobeAltIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import NotFound from '../components/NotFound';
import { InfoCard } from '../components/DocumentationUIComponents';
import LODImage from '../components/LODImage';
import Breadcrumbs from '../components/Breadcrumbs';

const MessengerDashboard = lazy(() => import('../components/MessengerDashboard'));

const renderFeatureWithLinks = (feature: string) => {
  const parts = feature.split(/(gpttunnel|Omnidesk)/g);
  return parts.map((part, i) => {
    if (part === 'gpttunnel') {
      return <a key={i} href="https://gpttunnel.ru/?ref=DEN_PROMO" target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-400 hover:underline transition-colors">gpttunnel</a>;
    }
    if (part === 'Omnidesk') {
      return <a key={i} href="https://omnidesk.ru/features/" target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-400 hover:underline transition-colors">Omnidesk</a>;
    }
    return part;
  });
};

// Keep anchors pointing at hash-friendly URLs so documentation links survive page reloads.
const toHashRoute = (path?: string) => {
  if (!path) return undefined;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `/#${normalized}`;
};

const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    return (
      <NotFound
        title="Проект не найден"
        message="К сожалению, мы не смогли найти проект, который вы ищете."
        linkText="Посмотреть все проекты"
        linkTo="/"
      />
    );
  }

  const documentationPath = project.documentationPage;
  const documentationHref = toHashRoute(documentationPath);
  const handleDocumentationClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (documentationPath) {
      navigate(documentationPath);
    }
  };

  const prevProject = projects[projectIndex - 1] || projects[projects.length - 1];
  const nextProject = projects[projectIndex + 1] || projects[0];

  const baseBtnClasses = "inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all duration-500 hover:-translate-y-1 focus:outline-none focus-visible:ring-4 shadow-xl";

  return (
    <div className="max-w-7xl mx-auto py-8 md:py-12">
      <Breadcrumbs />

      <article className="bg-slate-900/70 backdrop-blur-3xl rounded-4xl border border-slate-800 overflow-hidden shadow-premium relative isolate">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] to-transparent pointer-events-none -z-10"></div>

        <div className="lg:grid lg:grid-cols-12">
          <div className="lg:col-span-5 relative group min-h-[400px] lg:min-h-full overflow-hidden border-r border-slate-800 bg-slate-950">
            {project.useInteractivePreview ? (
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-slate-500 animate-pulse">Загрузка интерфейса...</div>}>
                <MessengerDashboard />
              </Suspense>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-30 pointer-events-none"></div>
                <LODImage
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full"
                  priority={true}
                />
              </>
            )}
          </div>

          <div className="lg:col-span-7 p-8 md:p-16 space-y-12">
            <header className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight">
                {project.title}
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed">
                {project.summary}
              </p>
            </header>

            <div className="animate-fade-in">
              <InfoCard icon={<LightBulbIcon className="w-8 h-8" />} title="Ключевые выводы">
                <ul className="space-y-4">
                  {project.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-slate-300 group">
                      <span className="text-indigo-500 font-black mt-0.5 group-hover:scale-110 transition-transform">0{idx + 1}.</span>
                      <span className="text-base font-medium leading-relaxed">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </InfoCard>
            </div>

            <div className="prose prose-invert prose-lg max-w-none text-slate-300 font-medium leading-relaxed space-y-6">
              {project.description.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <div className="space-y-8 pt-12 border-t border-slate-800">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <CheckBadgeIcon className="w-8 h-8 text-indigo-500" />
                  Функциональное ядро
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.keyFeatures.map((feature, index) => {
                    // Определяем иконку в зависимости от content feature
                    let FeatureIcon = DocumentTextIcon; // Default
                    if (feature.includes('Gherkin')) FeatureIcon = DocumentTextIcon;
                    else if (feature.includes('Автоматизация') || feature.includes('E2E')) FeatureIcon = PlayCircleIcon;
                    else if (feature.includes('платформ')) FeatureIcon = GlobeAltIcon;
                    else if (feature.includes('CI/CD')) FeatureIcon = ArrowPathIcon;

                    return (
                      <li key={index} className="flex items-start gap-4 p-6 rounded-2xl bg-slate-800/60 border border-slate-700/50 hover:border-indigo-500/40 hover:bg-slate-800 transition-all group">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/20 transition-all">
                          <FeatureIcon className="w-6 h-6 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                        </div>
                        <span className="text-sm text-slate-200 leading-relaxed font-semibold">{renderFeatureWithLinks(feature)}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            <div className="pt-12 border-t border-slate-800 flex flex-wrap gap-4">
              {documentationHref && (
                <a
                  href={documentationHref}
                  onClick={handleDocumentationClick}
                  className={`${baseBtnClasses} bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/20`}
                >
                  <BookOpenIcon className="w-5 h-5" />
                  Документация
                </a>
              )}

              {project.reportPage && (
                <Link
                  to={project.reportPage}
                  className={`${baseBtnClasses} bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 hover:text-white shadow-black/20`}
                >
                  <ChartBarIcon className="w-5 h-5" />
                  Технический отчёт
                </Link>
              )}

              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${baseBtnClasses} bg-slate-950/40 text-slate-400 border border-slate-800 hover:border-indigo-500/50 hover:text-white shadow-black/20`}
                >
                  <CodeBracketIcon className="w-5 h-5" />
                  Репозиторий
                </a>
              )}
            </div>
          </div>
        </div>
      </article>

      <nav aria-label="Навигация по проектам" className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to={`/project/${prevProject.slug}`}
          className="group flex flex-col items-start p-8 rounded-4xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 hover:bg-slate-900 shadow-lg transition-all duration-500"
        >
          <div className="flex items-center gap-3 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 group-hover:text-indigo-400 transition-colors">
            <ArrowLongLeftIcon className="w-5 h-5 transition-transform group-hover:-translate-x-2" />
            Предыдущий проект
          </div>
          <h3 className="text-xl md:text-2xl font-extrabold text-white group-hover:text-indigo-200 transition-colors tracking-tight">
            {prevProject.title}
          </h3>
        </Link>

        <Link
          to={`/project/${nextProject.slug}`}
          className="group flex flex-col items-end text-right p-8 rounded-4xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 hover:bg-slate-900 shadow-lg transition-all duration-500"
        >
          <div className="flex items-center gap-3 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 group-hover:text-indigo-400 transition-colors">
            Следующий проект
            <ArrowLongRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-2" />
          </div>
          <h3 className="text-xl md:text-2xl font-extrabold text-white group-hover:text-indigo-200 transition-colors tracking-tight">
            {nextProject.title}
          </h3>
        </Link>
      </nav>
    </div>
  );
};

export default ProjectPage;
