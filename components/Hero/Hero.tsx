'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';

import { LogoAura } from '../Branding/LogoAura';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  heroImageSrc?: string;
  heroImageAlt?: string;
}

export function Hero({ heroImageSrc, heroImageAlt }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const logoGraphicRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const ctas = gsap.utils.toArray<HTMLElement>(ctasRef.current?.children || []);

      // Initial settings
      gsap.set([logoGraphicRef.current, taglineRef.current, ...ctas], { opacity: 0 });
      gsap.set(navRef.current, { y: -30, opacity: 0 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0 });

      // Main Timeline
      const tl = gsap.timeline();

      // Nav entry
      tl.to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.3,
      });

      // Giant logo graphic reveal
      tl.fromTo(logoGraphicRef.current,
        { scale: 0.9, y: 20 },
        { scale: 1, y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '+=0.2'
      );

      // Tagline reveal
      tl.fromTo(taglineRef.current,
        { y: 20 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      );

      // CTAs
      tl.fromTo(ctas,
        { y: 20 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
        '-=0.4'
      );

      // Scroll Indicator
      tl.to(scrollIndicatorRef.current, {
        opacity: 1,
        duration: 0.7,
        onComplete: () => {
          gsap.to(scrollIndicatorRef.current, {
            opacity: 0.4,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut'
          });
        }
      });

      // ScrollTrigger to fade out indicator
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '100px top',
        scrub: 1,
        animation: gsap.to(scrollIndicatorRef.current, { opacity: 0, ease: 'none' })
      });

      // CTA Hovers
      if (ctas.length >= 1) {
        const ctaPrimary = ctas[0];

        ctaPrimary.addEventListener('mouseenter', () => {
          gsap.to(ctaPrimary, { scale: 1.03, filter: 'brightness(1.1)', duration: 0.3 });
        });
        ctaPrimary.addEventListener('mouseleave', () => {
          gsap.to(ctaPrimary, { scale: 1, filter: 'brightness(1)', duration: 0.3 });
        });
      }

    },
    { scope: containerRef }
  );

  return (
    <section className={styles.heroSection} ref={containerRef} role="region" aria-labelledby="hero-tagline">
      <div className={styles.imageArea}>
        <Image 
          src="/images/clinica-bg.jpg"
          alt="Consultório Aura Odontologia"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.imageGradient}></div>
      </div>

      <div className={styles.content}>
        <nav className={styles.nav} ref={navRef} aria-label="Navegação principal">
          <ul className={styles.navLinks}>
            <li><a href="#hero">Início</a></li>
            <li><a href="#sobre">Sobre Nós</a></li>
            <li><a href="#servicos">Tratamentos</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
        </nav>

        <div className={styles.textArea}>
          {/* Logo Graphic */}
          <div className={styles.logoGraphic} ref={logoGraphicRef}>
            <LogoAura className={styles.logoGraphicImg} light={true} />
          </div>

          {/* Tagline */}
          <div id="hero-tagline" className={styles.tagline} ref={taglineRef}>
            <span className={styles.taglinePart}>CUIDAR DE PESSOAS.</span>
            <span className={styles.taglinePart}>TRANSFORMAR SORRISOS.</span>
          </div>
          
          <div className={styles.ctas} ref={ctasRef}>
            <a href="https://wa.me/5548991190203?text=Olá!%20Gostaria%20de%20agendar%20um%20atendimento%20na%20Aura%20Odontologia." className={styles.ctaPrimary} target="_blank" rel="noopener noreferrer">
              AGENDAR UMA CONSULTA
            </a>
          </div>
        </div>

        <div className={styles.scrollIndicator} ref={scrollIndicatorRef}>
          <span>scroll</span>
          <div className={styles.scrollLine}></div>
        </div>
      </div>
    </section>
  );
}
