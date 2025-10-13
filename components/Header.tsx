import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

type Theme = 'light' | 'dark' | 'system';

const ThemeToggle: React.FC = () => {
    // Initialize state from localStorage or default to 'system' to prevent hydration mismatch and flashes
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window === 'undefined') {
            return 'system'; // Default for SSR
        }
        return (localStorage.getItem('theme') as Theme) || 'system';
    });

    // Effect to apply theme class and manage listeners for system changes
    useEffect(() => {
        let mediaQuery: MediaQueryList;
        const handleSystemThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
            // Apply dark mode if the media query matches
            document.documentElement.classList.toggle('dark', e.matches);
        };

        if (theme === 'system') {
            localStorage.removeItem('theme');
            mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            handleSystemThemeChange(mediaQuery);
            mediaQuery.addEventListener('change', handleSystemThemeChange);
        } else {
            localStorage.setItem('theme', theme);
            document.documentElement.classList.toggle('dark', theme === 'dark');
        }
        
        // Cleanup listener when component unmounts or theme changes
        return () => {
            if (mediaQuery) {
                mediaQuery.removeEventListener('change', handleSystemThemeChange);
            }
        };
    }, [theme]);

    // Handler to cycle through themes, intelligently skipping visually identical states
    const handleThemeChange = () => {
        const cycle: Theme[] = ['light', 'dark', 'system'];
        
        setTheme(currentTheme => {
            const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            const currentIndex = cycle.indexOf(currentTheme);
            let nextTheme = cycle[(currentIndex + 1) % cycle.length];

            // Determine if the current and next states are visually the same
            const isCurrentVisuallyDark = currentTheme === 'dark' || (currentTheme === 'system' && systemIsDark);
            const isNextVisuallyDark = nextTheme === 'dark' || (nextTheme === 'system' && systemIsDark);
            
            // If the next logical step would be a visual no-op, skip to the following step in the cycle
            if (isCurrentVisuallyDark === isNextVisuallyDark) {
                const nextIndex = cycle.indexOf(nextTheme);
                nextTheme = cycle[(nextIndex + 1) % cycle.length];
            }
            
            return nextTheme;
        });
    };

    const getIcon = () => {
        switch(theme) {
            case 'light': return <SunIcon className="w-5 h-5"/>;
            case 'dark': return <MoonIcon className="w-5 h-5"/>;
            case 'system': return <ComputerDesktopIcon className="w-5 h-5"/>;
        }
    }

    return (
        <button
            onClick={handleThemeChange}
            className="p-2 rounded-md text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-indigo-500 transition-colors"
            aria-label={`Current theme: ${theme}`}
        >
            {getIcon()}
        </button>
    );
};


const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isProjectOrDocPage = location.pathname.startsWith('/project/') || location.pathname.startsWith('/documentation/');

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
      isActive
        ? 'bg-slate-900 dark:bg-slate-700 text-white'
        : 'text-gray-300 hover:bg-slate-700 dark:hover:bg-slate-700 hover:text-white'
    }`;

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
            <ThemeToggle />
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
                    <NavLink to="/" className={navLinkClasses}>
                      Главная
                    </NavLink>
                    <NavLink to="/about" className={navLinkClasses}>
                      Обо мне
                    </NavLink>
                    <NavLink to="/contact" className={navLinkClasses}>
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
          ${isOpen && !isProjectOrDocPage ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}
        `}
        id="mobile-menu"
        aria-label="Мобильное меню"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink to="/" className={({ isActive }) => `${navLinkClasses({isActive})} block`} onClick={() => setIsOpen(false)}>
            Главная
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `${navLinkClasses({isActive})} block`} onClick={() => setIsOpen(false)}>
            Обо мне
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `${navLinkClasses({isActive})} block`} onClick={() => setIsOpen(false)}>
            Контакты
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;