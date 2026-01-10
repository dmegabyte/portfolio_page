
import React from 'react';
import { PhotoIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import LODImage from '../components/LODImage';

/**
 * GalleryPage - Демонстрация работы с LOD (Level of Detail) изображениями.
 * См. раздел 🧭 Руководящие принципы — пункт 2: UX (Производительность).
 */
const GalleryPage: React.FC = () => {
  const remoteImages = [
    { 
        src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200', 
        alt: 'Абстрактный неон', 
        title: 'Project Neon',
        desc: 'Киберпанк эстетика'
    },
    { 
        src: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=1200', 
        alt: 'Жидкий градиент', 
        title: 'Liquid Flow',
        desc: 'Генеративный дизайн'
    },
    { 
        src: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200', 
        alt: '3D Геометрия', 
        title: 'Cubic Realm',
        desc: '3D-моделирование'
    },
    { 
        src: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=1200', 
        alt: 'AI Визуализация', 
        title: 'Neural Core',
        desc: 'Синтез данных'
    },
    { 
        src: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1200', 
        alt: 'Космический интерфейс', 
        title: 'Void Interface',
        desc: 'UI/UX Исследование'
    },
    { 
        src: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&q=80&w=1200', 
        alt: 'Генеративная архитектура', 
        title: 'Bionic Form',
        desc: 'Алгоритмический дизайн'
    },
  ];

  return (
    <div className="animate-fade-in space-y-12 py-12">
      <div className="text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-widest">
          <GlobeAltIcon className="w-4 h-4" />
          Progressive Image Loading (LOD)
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8">
          ГАЛЕРЕЯ <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
            ПРОЯВЛЯЕТСЯ
          </span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Мы используем технику <strong>Blur-up LOD</strong>. Сначала вы видите размытый слепок весом в пару килобайт, 
            который плавно превращается в 4K изображение по мере загрузки.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 max-w-7xl mx-auto">
        {remoteImages.map((img, index) => (
          <div 
            key={index}
            className="group relative bg-slate-900 rounded-[40px] overflow-hidden border border-slate-800 shadow-3xl hover:border-indigo-500/30 transition-all duration-500"
          >
            {/* LOD Component вместо обычного img */}
            <LODImage 
                src={img.src} 
                alt={img.alt} 
                className="aspect-[4/5] md:aspect-square" 
            />
            
            <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-px bg-indigo-500/50"></span>
                    <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">{img.desc}</p>
                </div>
                <h3 className="text-white font-black text-3xl tracking-tight">{img.title}</h3>
            </div>
            
            {/* Hover Effect Light */}
            <div className="absolute top-0 left-0 w-full h-full bg-indigo-500/0 group-hover:bg-indigo-500/5 transition-colors pointer-events-none"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
