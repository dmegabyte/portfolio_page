
import { useEffect } from 'react';

/**
 * useBackgroundPreloader - Оптимизированный механизм предварительной загрузки.
 * Использует requestIdleCallback для загрузки ассетов, когда браузер находится в покое.
 * См. README.md, Принцип 2 (UX) и Принцип 4 (Качество UI).
 */
export const useBackgroundPreloader = (imageUrls: string[]) => {
  useEffect(() => {
    // Функция загрузки
    const preloadImages = () => {
      console.debug(`[Prefetcher] Начата фоновая загрузка ${imageUrls.length} ассетов.`);
      imageUrls.forEach((url) => {
        const img = new Image();
        img.src = url;
        // Low res не нужен для прелоада, так как LOD компонент сам справится,
        // но оставим для кеширования DNS/TCP соединения.
      });
    };

    // Используем requestIdleCallback если доступен, иначе fallback на setTimeout
    if ('requestIdleCallback' in window) {
      const handle = (window as any).requestIdleCallback(preloadImages, { timeout: 5000 });
      return () => (window as any).cancelIdleCallback(handle);
    } else {
      // Увеличен таймаут до 3 сек, чтобы точно дать React гидратироваться
      const timer = setTimeout(preloadImages, 3000);
      return () => clearTimeout(timer);
    }
  }, [imageUrls]);
};
