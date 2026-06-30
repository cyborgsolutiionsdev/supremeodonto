'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './CTAFlutuante.module.css';

export function CTAFlutuante() {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Scroll handler to toggle visibility state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(
    () => {
      if (!buttonRef.current) return;

      if (visible) {
        // Fade & Scale In
        gsap.to(buttonRef.current, {
          opacity: 1,
          scale: 1,
          pointerEvents: 'auto',
          duration: 0.5,
          ease: 'power3.out',
        });
      } else {
        // Fade & Scale Out
        gsap.to(buttonRef.current, {
          opacity: 0,
          scale: 0.8,
          pointerEvents: 'none',
          duration: 0.5,
          ease: 'power3.out',
        });
      }
    },
    { dependencies: [visible] }
  );

  // Pulse animation for the glowing ring
  useGSAP(() => {
    if (!ringRef.current) return;

    gsap.to(ringRef.current, {
      scale: 1.6,
      opacity: 0,
      duration: 1.8,
      ease: 'power1.out',
      repeat: -1,
    });
  });

  const handleMouseEnter = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1.1,
        boxShadow: '0 8px 30px rgba(37, 211, 102, 0.6)',
        duration: 0.3,
        ease: 'power3.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1,
        boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
        duration: 0.3,
        ease: 'power3.out',
      });
    }
  };

  return (
    <a
      ref={buttonRef}
      href="https://wa.me/5548991190203?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20minha%20avalia%C3%A7%C3%A3o%20gratuita."
      target="_blank"
      rel="noopener noreferrer"
      className={styles.button}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Entrar em contato pelo WhatsApp"
      title="WhatsApp Aura Odontologia"
    >
      <div ref={ringRef} className={styles.pulseRing} />
      <span className={styles.tooltip}>Falar agora</span>
      <svg className={styles.whatsIcon} viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.727-1.465L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.864-9.83.002-2.623-1.023-5.086-2.884-6.948C16.59 1.952 14.129 1.258 11.97 1.258c-5.437 0-9.863 4.414-9.867 9.831-.001 1.73.461 3.42 1.339 4.916l-.988 3.604 3.704-.972zm12.355-6.52c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      </svg>
    </a>
  );
}
