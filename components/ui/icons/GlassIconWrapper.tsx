
import React, { ReactNode } from 'react';

interface GlassIconWrapperProps {
  children: ReactNode;
  glowColor: string;
  className?: string;
}

const GlassIconWrapper: React.FC<GlassIconWrapperProps> = ({ children, glowColor, className = '' }) => {
  const uniqueId = React.useId();
  const filterId = `glow-${uniqueId}`;

  return (
    <g className={className}>
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
        </filter>
      </defs>
      
      {/* Neon Glow Outline */}
      <rect
        x="-30"
        y="-30"
        width="60"
        height="60"
        rx="12"
        fill="none"
        stroke={glowColor}
        strokeWidth="4"
        filter={`url(#${filterId})`}
        opacity="0.7"
      />
      
      {/* Crisp Main Outline */}
      <rect
        x="-30"
        y="-30"
        width="60"
        height="60"
        rx="12"
        fill="transparent"
        stroke={glowColor}
        strokeWidth="2"
      />
      
      {/* Inner Icon */}
      <g transform="scale(0.6)" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </g>
  );
};

export default GlassIconWrapper;
