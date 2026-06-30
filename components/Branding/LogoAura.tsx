'use client';

import React from 'react';

interface LogoAuraProps {
  className?: string;
  light?: boolean;
}

export function LogoAura({ className, light = false }: LogoAuraProps) {
  const textColor = light ? 'var(--color-white)' : 'var(--color-charcoal)';

  return (
    <svg
      className={className}
      viewBox="0 0 320 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', height: '100%', width: 'auto' }}
    >
      <defs>
        <linearGradient id="gold-grad" x1="10" y1="10" x2="90" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5E3B5" />
          <stop offset="40%" stopColor="#D4AF37" />
          <stop offset="70%" stopColor="#B38F24" />
          <stop offset="100%" stopColor="#85640F" />
        </linearGradient>
      </defs>
      
      {/* Icon (Elegant Thin Luxury Crest combining Monogram A and stylized tooth/arch) */}
      <path
        d="M 50,15 L 24,73 C 26,71 31,71 34,71 L 40,71 C 42,71 44,68 46,55 C 54,55 56,71 58,71 L 64,71 C 67,71 72,71 74,73 L 48,15 Z"
        fill="url(#gold-grad)"
      />
      <path
        d="M 48,42 L 41,56 L 55,56 Z"
        fill="url(#gold-grad)"
      />
      
      {/* Text "AURA" (Premium Serif typeface) */}
      <text
        x="105"
        y="45"
        fontFamily="var(--font-heading), 'Cormorant Garamond', serif"
        fontSize="36"
        fontWeight="300"
        fill={textColor}
        letterSpacing="0.12em"
      >
        AURA
      </text>

      {/* Text "ODONTOLOGIA" (Sophisticated light sans-serif) */}
      <text
        x="107"
        y="63"
        fontFamily="var(--font-body), 'Jost', sans-serif"
        fontSize="10.5"
        fontWeight="500"
        fill="var(--color-gold)"
        letterSpacing="0.4em"
      >
        ODONTOLOGIA
      </text>
    </svg>
  );
}
