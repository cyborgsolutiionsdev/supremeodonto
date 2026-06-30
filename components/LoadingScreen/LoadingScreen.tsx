'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [percent, setPercent] = useState(0);

  useGSAP(
    () => {
      if (!pathRef.current || !containerRef.current) return;

      const path = pathRef.current;
      const length = path.getTotalLength();

      // Set initial state
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        fillOpacity: 0,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.delayedCall(0.3, () => {
            gsap.to(containerRef.current, {
              yPercent: -100,
              duration: 0.7,
              ease: 'power3.inOut',
              onComplete: onComplete,
            });
          });
        },
      });

      // Animate stroke
      tl.to(path, {
        strokeDashoffset: 0,
        duration: 1.8,
        ease: 'power2.inOut',
      }, 0);

      // Animate percentage
      const counter = { val: 0 };
      tl.to(counter, {
        val: 100,
        duration: 1.8,
        ease: 'power2.inOut',
        onUpdate: () => {
          setPercent(Math.round(counter.val));
        },
      }, 0);

      // Animate fill opacity starting at 1.4s
      tl.to(path, {
        fillOpacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      }, 1.4);
    },
    { scope: containerRef }
  );

  return (
    <div 
      className={styles.container} 
      ref={containerRef}
      role="status"
      aria-label="Carregando Aura Odontologia"
    >
      <svg 
        className={styles.toothSvg}
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          className={styles.toothPath}
          d="M 50,12 C 40,12 22,50 20,76 C 18,90 28,88 35,88 C 45,88 47,80 50,60 C 53,80 55,88 65,88 C 72,88 82,90 80,76 C 78,50 60,12 50,12 Z M 50,30 C 53,42 56,54 58,62 C 54,64 46,64 42,62 C 44,54 47,42 50,30 Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className={styles.percentage}>{percent}%</div>
      <div className={styles.branding}>Aura Odontologia</div>
    </div>
  );
}
