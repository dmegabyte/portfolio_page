import React from 'react';
import NotFound from '../components/NotFound';

const NotFoundPage: React.FC = () => {
  return (
    <NotFound 
      title="404 - Страница не найдена"
      message="К сожалению, страница, которую вы ищете, не существует. Возможно, она была перемещена или удалена."
    />
  );
};

export default NotFoundPage;