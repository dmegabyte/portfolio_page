import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  // FIX: Reverted to a standard constructor for state initialization. The class property syntax was causing type inference issues where `this.props` was not recognized on the component instance.
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleRetry = () => {
    // A full page reload is a robust way to recover from a render error.
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 sm:p-8 lg:p-12 animate-fade-in border border-red-200 dark:border-red-700 text-center">
            <ExclamationCircleIcon className="mx-auto h-16 w-16 text-red-500 dark:text-red-400" aria-hidden="true" />
            <h1 className="mt-4 text-3xl font-extrabold text-slate-900 dark:text-slate-200">Что-то пошло не так</h1>
            <p className="mt-4 text-lg text-slate-700 dark:text-slate-400">
              При загрузке этой части страницы произошла ошибка. Пожалуйста, попробуйте обновить страницу, это может решить проблему.
            </p>
            <div className="mt-8">
                <button
                  onClick={this.handleRetry}
                  className="inline-block bg-[var(--color-interactive-primary-strong)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-interactive-primary-strong-hover)] transition-all duration-300 no-underline shadow-sm transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-interactive-primary)] focus-visible:ring-offset-2 ring-offset-[var(--ring-offset-light)] dark:focus-visible:ring-offset-[var(--ring-offset-dark-card)]"
                >
                  Обновить страницу
                </button>
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
