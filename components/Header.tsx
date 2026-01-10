
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const isProjectOrDocPage = location.pathname.startsWith('/project/') || 
                             location.pathname.startsWith('/documentation/') || 
                             location.pathname.startsWith('/report/');

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleBackClick = () => {
    const { pathname } = location;
    if (pathname.startsWith('/documentation/') || pathname.startsWith('/report/')) {
      const slug = pathname.split('/')[2];
      navigate(slug ? `/project/${slug}` : '/');
    } else if (pathname.startsWith('/project/')) {
      navigate('/');
    } else {
      navigate(-1);
    }
  };

  const baseClasses = "px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2";
  const activeClasses = "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/5";
  const inactiveClasses = "text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent";
  
  const getNavLinkClasses = ({ isActive }: { isActive: boolean }) => 
    `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;

  return (
    <header 
      className={`
        sticky top-0 z-[60] transition-all duration-500
        ${scrolled || isOpen 
          ? 'bg-slate-950/80 backdrop-blur-2xl border-b border-slate-800/50 shadow-2xl' 
          : 'bg-transparent border-b border-transparent'
        }
      `}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Основная навигация">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center gap-4 group focus:outline-none">
              <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-indigo-500/20 group-hover:rotate-6 group-hover:scale-105 transition-all">
                P
              </span>
              <span className="text-white font-extrabold text-2xl tracking-tighter hidden sm:block">
                PORTFOLIO
              </span>
            </NavLink>
          </div>
          
          <div className="flex items-center gap-4">
            {isProjectOrDocPage && (
              <button
                onClick={handleBackClick}
                className="group border border-slate-800 bg-slate-900/40 text-slate-300 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 hover:text-white transition-all transform active:scale-95 flex items-center gap-2"
                aria-label="Вернуться назад"
              >
                <ChevronLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                НАЗАД
              </button>
            )}

            <div className="hidden md:flex items-center space-x-2">
              <NavLink to="/" className={getNavLinkClasses} end>Главная</NavLink>
              <NavLink to="/about" className={getNavLinkClasses}>Обо мне</NavLink>
              <NavLink to="/contact" className={getNavLinkClasses}>Контакты</NavLink>
            </div>

            <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="md:hidden p-3 rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-white transition-all active:scale-90"
                aria-expanded={isOpen}
              >
                {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          md:hidden fixed inset-0 top-20 bg-slate-950/95 backdrop-blur-3xl transition-all duration-500 ease-in-out
          ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.05] to-transparent pointer-events-none"></div>
        <div className="relative p-8 flex flex-col space-y-2">
          {[
            { name: 'ГЛАВНАЯ', to: '/' },
            { name: 'ОБО МНЕ', to: '/about' },
            { name: 'КОНТАКТЫ', to: '/contact' },
            { name: 'ТЕСТОВЫЙ САЙТ', to: '/test-site' }
          ].map((link) => (
            <NavLink 
              key={link.to}
              to={link.to} 
              className={({ isActive }) => `
                text-4xl font-black py-6 border-b border-slate-900/50 transition-all
                ${isActive ? 'text-indigo-400' : 'text-white/40 hover:text-white'}
              `}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
