import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isProjectOrDocPage = location.pathname.startsWith('/project/') || location.pathname.startsWith('/documentation/');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
      document.documentElement.classList.toggle('dark', e.matches);
    };
    
    handleSystemThemeChange(mediaQuery);
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const baseClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300";
  const activeClasses = "bg-slate-900 dark:bg-slate-700 text-white";
  const inactiveClasses = "text-gray-300 hover:bg-slate-700 dark:hover:bg-slate-700 hover:text-white";
  
  const getNavLinkClasses = ({ isActive }: { isActive: boolean }) => 
    `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  
  const getMobileNavLinkClasses = ({ isActive }: { isActive: boolean }) => 
    `${baseClasses} ${isActive ? activeClasses : inactiveClasses} block`;

  return (
    <header className="bg-slate-800 dark:bg-slate-900 shadow-lg sticky top-0 z-50 border-b border-slate-700 dark:border-slate-800">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Основная навигация">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="text-white font-bold text-xl">
              Мои проекты
            </NavLink>
          </div>
          
          <div className="flex items-center gap-2">
            {isProjectOrDocPage ? (
              <div>
                <button
                  onClick={() => navigate(-1)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-indigo-700 transition-colors duration-300 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Назад
                </button>
              </div>
            ) : (
              <>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-baseline space-x-4">
                    <NavLink to="/" end className={getNavLinkClasses}>
                      Главная
                    </NavLink>
                    <NavLink to="/about" className={getNavLinkClasses}>
                      Обо мне
                    </NavLink>
                    <NavLink to="/contact" className={getNavLinkClasses}>
                      Контакты
                    </NavLink>
                  </div>
                </div>
                <div className="flex md:hidden">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="bg-slate-800 dark:bg-slate-900 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded={isOpen}
                  >
                    <span className="sr-only">Open main menu</span>
                    {isOpen ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen && !isProjectOrDocPage ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
        `}
        id="mobile-menu"
        aria-label="Мобильное меню"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink to="/" end className={getMobileNavLinkClasses}>
            Главная
          </NavLink>
          <NavLink to="/about" className={getMobileNavLinkClasses}>
            Обо мне
          </NavLink>
          <NavLink to="/contact" className={getMobileNavLinkClasses}>
            Контакты
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;