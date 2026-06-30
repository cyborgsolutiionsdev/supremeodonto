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
        <linearGradient id="gold-grad" x1="20" y1="12" x2="80" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E6C875" />
          <stop offset="50%" stopColor="#AD9324" />
          <stop offset="100%" stopColor="#806B13" />
        </linearGradient>
      </defs>
      
      {/* Icon (Monogram 'A') */}
      <path
        d="M 50,12 C 40,12 22,50 20,76 C 18,90 28,88 35,88 C 45,88 47,80 50,60 C 53,80 55,88 65,88 C 72,88 82,90 80,76 C 78,50 60,12 50,12 Z M 50,30 C 53,42 56,54 58,62 C 54,64 46,64 42,62 C 44,54 47,42 50,30 Z"
        fill="url(#gold-grad)"
      />
      
      {/* Text "AURA" (Serif typography style) */}
      <text
        x="105"
        y="44"
        fontFamily="var(--font-heading)"
        fontSize="34"
        fontWeight="700"
        fill={textColor}
        letterSpacing="0.08em"
      >
        AURA
      </text>

      {/* Text "ODONTOLOGIA" (Sans-serif typography style) */}
      <text
        x="107"
        y="64"
        fontFamily="var(--font-body)"
        fontSize="11"
        fontWeight="600"
        fill="var(--color-gold)"
        letterSpacing="0.32em"
      >
        ODONTOLOGIA
      </text>
    </svg>
  );
}
