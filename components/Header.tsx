import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isProjectOrDocPage = location.pathname.startsWith('/project/') || 
                             location.pathname.startsWith('/documentation/') || 
                             location.pathname.startsWith('/report/');

  // Effect to close menu on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Effect to prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Cleanup function to ensure scroll is re-enabled on component unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleBackClick = () => {
    const { pathname } = location;

    // From a documentation or report page, go to the corresponding project page.
    if (pathname.startsWith('/documentation/') || pathname.startsWith('/report/')) {
      const slug = pathname.split('/')[2];
      if (slug) {
        navigate(`/project/${slug}`);
      } else {
        // Fallback to homepage if slug is missing
        navigate('/'); 
      }
    } else if (pathname.startsWith('/project/')) {
      // From any project page, "Back" should go to the main project list (homepage)
      navigate('/');
    } else {
      // This case should not be reached given the button's visibility condition,
      // but it serves as a safe fallback.
      navigate(-1);
    }
  };

  const baseClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300";
  const activeClasses = "bg-slate-900 dark:bg-slate-700 text-white";
  const inactiveClasses = "text-gray-300 hover:bg-slate-700 dark:hover:bg-slate-700 hover:text-white";
  
  const getNavLinkClasses = ({ isActive }: { isActive: boolean }) => 
    `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  
  const getMobileNavLinkClasses = ({ isActive }: { isActive: boolean }) => 
    `block text-base ${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;

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
              <button
                onClick={handleBackClick}
                className="border border-slate-600 text-slate-300 px-4 py-2 rounded-md text-sm font-semibold hover:bg-slate-700 hover:text-white transition-all duration-300 flex items-center transform hover:-translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
                aria-label="Вернуться назад"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Назад
              </button>
            ) : (
              <>
                {/* --- Desktop Navigation --- */}
                <div className="hidden md:block">
                  <div className="ml-4 flex items-baseline space-x-4">
                    <NavLink to="/" className={getNavLinkClasses} end>
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

                {/* --- Mobile Menu Button (Burger) --- */}
                <div className="flex md:hidden">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="relative bg-slate-800 dark:bg-slate-900 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white h-10 w-10"
                    aria-controls="mobile-menu"
                    aria-expanded={isOpen}
                  >
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon
                        className={`block h-6 w-6 transition-transform transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}`}
                        aria-hidden="true"
                    />
                    <XMarkIcon
                        className={`absolute h-6 w-6 transition-transform transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'}`}
                        aria-hidden="true"
                    />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      {isOpen && !isProjectOrDocPage && (
        <div
          className="fixed inset-0 top-16 bg-black/30 backdrop-blur-sm z-40 md:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden absolute top-16 left-0 right-0 bg-slate-800 dark:bg-slate-900 transition-all duration-300 ease-in-out shadow-lg
          ${isOpen && !isProjectOrDocPage ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}
        `}
        id="mobile-menu"
        aria-label="Мобильное меню"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink to="/" className={getMobileNavLinkClasses} end>
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