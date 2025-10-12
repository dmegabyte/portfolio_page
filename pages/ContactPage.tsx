import React from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 sm:p-8 lg:p-12 animate-fade-in border border-gray-200 dark:border-slate-700">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-slate-50 leading-tight mb-4">
          Свяжитесь со мной
        </h1>
        <p className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
          Открыт для интересных проектов и сотрудничества.
        </p>
      </div>
      <div className="max-w-md mx-auto space-y-6">
        <a 
          href="mailto:d.megababyte@gmail.com"
          className="group flex items-center justify-center w-full p-4 border border-gray-300 dark:border-slate-700 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-slate-700"
        >
          <EnvelopeIcon className="h-8 w-8 text-gray-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
          <span className="ml-4 text-lg font-medium text-gray-800 dark:text-slate-200 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
            d.megababyte@gmail.com
          </span>
        </a>
        
        <a 
          href="https://t.me/Nothingname001"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center w-full p-4 border border-gray-300 dark:border-slate-700 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:border-sky-500 dark:hover:border-sky-500 hover:bg-sky-50 dark:hover:bg-slate-700"
        >
          <svg className="h-8 w-8 text-gray-500 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9- .902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.04-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.662 3.488-1.373 5.55-2.182 6.502-2.583 2.1-.9 2.583-1.044 2.924-1.05.288-.004.52.06.674.19z" />
          </svg>
          <span className="ml-4 text-lg font-medium text-gray-800 dark:text-slate-200 group-hover:text-sky-700 dark:group-hover:text-sky-300">
            Telegram
          </span>
        </a>
      </div>
    </div>
  );
};

export default ContactPage;