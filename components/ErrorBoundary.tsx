

import React, { Component, ErrorInfo, ReactNode } from 'react';
// FIX: Added import for ExclamationCircleIcon as it's used in the render method.
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * ErrorBoundary - Компонент для отлова ошибок в дочерних компонентах.
 * Соответствует Принципу 8: Компонентная архитектура (см. README.md).
 * Использование конструктора и явного наследования от React.Component решает проблемы с доступом к props и state в TypeScript.
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };
  // FIX: Explicitly declaring props to ensure TypeScript recognizes it,
  // resolving the "Property 'props' does not exist on type 'ErrorBoundary'" error.
  public readonly props: Props;

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render(): ReactNode {
    // Отображение запасного UI при наличии ошибки (Принцип 4: Безупречное качество UI)
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-red-200 dark:border-red-900/30 text-center">
          <ExclamationCircleIcon className="h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Что-то пошло не так</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Произошла непредвиденная ошибка.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
          >
            Обновить страницу
          </button>
        </div>
      );
    }

    // Рендеринг дочерних элементов в штатном режиме (Принцип 8: Компонентная архитектура)
    return this.props.children;
  }
}

export default ErrorBoundary;