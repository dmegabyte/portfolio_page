import React from 'react';
import { EnvelopeIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 sm:p-8 lg:p-12 animate-fade-in border border-gray-200 dark:border-slate-700">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-200 leading-tight mb-4">
          Свяжитесь со мной
        </h1>
        <p className="text-lg text-slate-700 dark:text-slate-400 max-w-2xl mx-auto">
          Открыт для интересных проектов и сотрудничества.
        </p>
      </div>
      <div className="max-w-md mx-auto space-y-6">
        <a 
          href="mailto:d.megabyte@gmail.com"
          className="group flex items-center justify-center w-full p-4 border border-gray-300 dark:border-slate-700 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[var(--color-interactive-primary)] dark:hover:border-[var(--color-interactive-primary)] hover:bg-indigo-50 dark:hover:bg-slate-700 transform hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-interactive-primary)] focus-visible:ring-offset-2 ring-offset-[var(--ring-offset-light)] dark:focus-visible:ring-offset-[var(--ring-offset-dark-card)]"
        >
          <EnvelopeIcon className="h-8 w-8 text-gray-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
          <span className="ml-4 text-lg font-medium text-slate-800 dark:text-slate-200 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
            d.megabyte@gmail.com
          </span>
        </a>
        
        <a 
          href="https://t.me/Nothingname001"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center w-full p-4 border border-gray-300 dark:border-slate-700 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[var(--color-interactive-secondary)] dark:hover:border-[var(--color-interactive-secondary)] hover:bg-sky-50 dark:hover:bg-slate-700 transform hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-interactive-secondary)] focus-visible:ring-offset-2 ring-offset-[var(--ring-offset-light)] dark:focus-visible:ring-offset-[var(--ring-offset-dark-card)]"
        >
          <PaperAirplaneIcon className="h-8 w-8 text-gray-500 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors" />
          <span className="ml-4 text-lg font-medium text-slate-800 dark:text-slate-200 group-hover:text-sky-700 dark:group-hover:text-sky-300">
            Telegram
          </span>
        </a>
      </div>
    </div>
  );
};

export default ContactPage;