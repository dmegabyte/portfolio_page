
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { projects } from '../data/projects';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDocMenuOpen, setIsDocMenuOpen] = useState(false);
  const [isMobileDocMenuOpen, setIsMobileDocMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isProjectOrDocPage = location.pathname.startsWith('/project/') || location.pathname.startsWith('/documentation/');
  const docMenuRef = useRef<HTMLDivElement>(null);

  const docProjects = projects.filter(p => p.documentationPage);

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
    setIsDocMenuOpen(false);
    setIsMobileDocMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (docMenuRef.current && !docMenuRef.current.contains(event.target as Node)) {
        setIsDocMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
                    <NavLink to="/gallery" className={getNavLinkClasses}>
                      Галерея
                    </NavLink>

                    <div className="relative" ref={docMenuRef}>
                      <button
                        onClick={() => setIsDocMenuOpen(!isDocMenuOpen)}
                        className={`${baseClasses} ${inactiveClasses} flex items-center gap-1`}
                        aria-haspopup="true"
                        aria-expanded={isDocMenuOpen}
                      >
                        Документация
                        <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isDocMenuOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isDocMenuOpen && (
                        <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black dark:ring-slate-700 ring-opacity-5 focus:outline-none animate-fade-in" style={{animationDuration: '150ms'}}>
                          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            {docProjects.map(project => (
                              <NavLink
                                key={project.id}
                                to={project.documentationPage!}
                                className={({ isActive }) => `block w-full text-left px-4 py-2 text-sm ${isActive ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold' : 'text-slate-700 dark:text-slate-300'} hover:bg-slate-100 dark:hover:bg-slate-700`}
                                role="menuitem"
                              >
                                {project.title}
                              </NavLink>
                            ))}
                             <div className="border-t border-gray-200 dark:border-slate-700 my-1"></div>
                            <NavLink
                                to="/documentation/ui-components"
                                className={({ isActive }) => `block w-full text-left px-4 py-2 text-sm ${isActive ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold' : 'text-slate-700 dark:text-slate-300'} hover:bg-slate-100 dark:hover:bg-slate-700`}
                                role="menuitem"
                              >
                                UI Компоненты
                              </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                    
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
          <NavLink to="/gallery" className={getMobileNavLinkClasses}>
            Галерея
          </NavLink>
          
          <div>
            <button
              onClick={() => setIsMobileDocMenuOpen(!isMobileDocMenuOpen)}
              className={`${baseClasses} ${inactiveClasses} w-full flex justify-between items-center`}
              aria-haspopup="true"
              aria-expanded={isMobileDocMenuOpen}
            >
              <span>Документация</span>
              <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${isMobileDocMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileDocMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
              <div className="pl-4 pt-1 space-y-1 border-l-2 border-slate-700 ml-3">
                {docProjects.map(project => (
                  <NavLink
                    key={project.id}
                    to={project.documentationPage!}
                    className={getMobileNavLinkClasses}
                  >
                    {project.title}
                  </NavLink>
                ))}
                 <NavLink
                  to="/documentation/ui-components"
                  className={getMobileNavLinkClasses}
                >
                  UI Компоненты
                </NavLink>
              </div>
            </div>
          </div>

          <NavLink to="/contact" className={getMobileNavLinkClasses}>
            Контакты
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
