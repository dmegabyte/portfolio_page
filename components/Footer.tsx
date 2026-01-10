
import React from 'react';

const Footer: React.FC = () => {

  return (
    <footer className="bg-slate-800 dark:bg-slate-900 text-white border-t border-slate-700 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center text-sm text-gray-400 dark:text-slate-400 space-y-1">
          <p className="font-semibold tracking-wider text-slate-500">100% vibe-coding</p>
          <p>&copy; 2025 Мои проекты. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
