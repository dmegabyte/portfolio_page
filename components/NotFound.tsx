import React from 'react';
import { Link } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface NotFoundProps {
  title: string;
  message: string;
  linkText?: string;
  linkTo?: string;
}

const NotFound: React.FC<NotFoundProps> = ({ 
  title, 
  message, 
  linkText = "Вернуться на главную", 
  linkTo = "/" 
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 sm:p-8 lg:p-12 animate-fade-in border border-gray-200 dark:border-slate-700 text-center">
      <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-amber-500 dark:text-amber-400" aria-hidden="true" />
      <h1 className="mt-4 text-3xl font-extrabold text-slate-900 dark:text-slate-200">{title}</h1>
      <p className="mt-4 text-lg text-slate-700 dark:text-slate-400 max-w-xl mx-auto">{message}</p>
      <div className="mt-8">
        <Link
          to={linkTo}
          className="inline-block bg-[var(--color-interactive-primary-strong)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-interactive-primary-strong-hover)] transition-all duration-300 no-underline shadow-sm transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-interactive-primary)] focus-visible:ring-offset-2 ring-offset-[var(--ring-offset-light)] dark:focus-visible:ring-offset-[var(--ring-offset-dark-card)]"
        >
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;