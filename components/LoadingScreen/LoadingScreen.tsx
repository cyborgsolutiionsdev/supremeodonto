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
          d="M30,20 C30,10 40,5 50,15 C60,5 70,10 70,20 C75,35 65,45 60,60 C55,75 55,85 55,90 C55,95 45,95 45,90 C45,85 45,75 40,60 C35,45 25,35 30,20 Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className={styles.percentage}>{percent}%</div>
      <div className={styles.branding}>Aura Odontologia</div>
    </div>
  );
}
