
import React, { useState, useEffect } from 'react';

interface LODImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean; // New prop for critical images
}

/**
 * LODImage (v10 Performance) - Поддержка Eager Loading и Fetch Priority.
 * Реализует паттерн Progressive Loading с возможностью приоритезации.
 * См. README.md, Принцип 4 (Качество UI).
 */
const LODImage: React.FC<LODImageProps> = ({ src, alt, className = "", priority = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // LOD Preview URL
  const lowResUrl = src.includes('unsplash.com') 
    ? src.replace(/w=\d+/, 'w=16').replace(/q=\d+/, 'q=1') + '&blur=5'
    : src;

  // Обработчик загрузки изображения
  const handleLoad = () => {
    // requestAnimationFrame гарантирует, что стейт обновится перед перерисовкой
    requestAnimationFrame(() => {
        setIsLoaded(true);
    });
  };

  return (
    <div 
      className={`relative overflow-hidden bg-slate-950 group shadow-2xl isolate ${className}`}
    >
      {/* 1. Low-Res Background (Blur Layer) */}
      <div 
        className="absolute inset-0 z-10 bg-cover bg-center transition-opacity ease-out will-change-opacity"
        style={{ 
            backgroundImage: `url(${lowResUrl})`,
            transitionDuration: '1500ms', 
            opacity: isLoaded ? 0 : 1,
            filter: 'blur(10px)',
            transform: 'scale(1.05)'
        }}
      />

      {/* 2. High-Res Image (Target) */}
      {/* priority prop переключает режим загрузки на мгновенный */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        // @ts-ignore - fetchPriority is standard but types might lag
        fetchPriority={priority ? "high" : "auto"} 
        decoding="async"
        onLoad={handleLoad}
        className={`
          absolute inset-0 w-full h-full object-cover z-20
          transition-all ease-out will-change-[opacity,transform] transform-gpu
        `}
        style={{
            transitionDuration: '2400ms',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'scale(1)' : 'scale(1.05)',
            filter: isLoaded ? 'contrast(100%)' : 'contrast(110%) blur(2px)'
        }}
      />
      
      {/* 3. Виньетка (Cinematic Overlay) */}
      <div className={`
        absolute inset-0 z-30 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent 
        pointer-events-none transition-opacity duration-2000 delay-200
        ${isLoaded ? 'opacity-100' : 'opacity-0'}
      `}></div>
      
      {/* 4. Интерактивность при наведении */}
      <div className="absolute inset-0 z-40 bg-white/0 group-hover:bg-white/5 transition-colors duration-500 pointer-events-none"></div>
    </div>
  );
};

export default LODImage;
