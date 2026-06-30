'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Depoimentos.module.css';

gsap.registerPlugin(ScrollTrigger);

const depoimentos = [
  {
    nome: 'Ana Carolina Silva',
    nota: 5,
    texto: 'Fiz minhas facetas de porcelana com a Dra. Beatriz e o resultado superou todas as minhas expectativas. O atendimento foi impecável do início ao fim, e o meu sorriso ficou extremamente natural. Recomendo de olhos fechados!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
  },
  {
    nome: 'Marcos Tolentino',
    nota: 5,
    texto: 'Clínica fantástica em Florianópolis. O Dr. Roberto realizou o meu tratamento de implante dentário com muita precisão e paciência, tirando todas as minhas dúvidas. Tecnologia de ponta e ambiente muito acolhedor.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
  },
  {
    nome: 'Juliana Ramos',
    nota: 5,
    texto: 'Fiz clareamento dental a laser e achei excelente! Não senti nenhuma sensibilidade e o resultado ficou lindo. A equipe é super atenciosa e o Dr. Carlos Eduardo foi extremamente profissional.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop',
  },
  {
    nome: 'Camila Ferreira',
    nota: 5,
    texto: 'Excelente experiência! O atendimento é humanizado e a clínica é super moderna. Fiz uma limpeza profunda e profilaxia, tudo muito tranquilo e sem dor. Voltarei com certeza!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
  },
  {
    nome: 'Rafael Medeiros',
    nota: 5,
    texto: 'Gostaria de parabenizar toda a equipe da Aura Odontologia. Realizei a extração do siso com o Dr. Carlos Eduardo, foi super rápido e a recuperação foi excelente graças aos cuidados dele.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
  }
];

export function Depoimentos() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardContentRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Entry animations
      gsap.from(headerRef.current, {
        y: 45,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      gsap.from(sliderRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  const changeTestimonial = (newIndex: number) => {
    if (!cardContentRef.current) return;

    // Smooth transition between cards
    gsap.to(cardContentRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        setActiveIndex(newIndex);
        gsap.fromTo(
          cardContentRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
        );
      },
    });
  };

  const handlePrev = () => {
    const newIndex = activeIndex === 0 ? depoimentos.length - 1 : activeIndex - 1;
    changeTestimonial(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeIndex === depoimentos.length - 1 ? 0 : activeIndex + 1;
    changeTestimonial(newIndex);
  };

  const current = depoimentos[activeIndex];

  return (
    <section id="depoimentos" className={styles.section} ref={sectionRef}>
      {/* Curved top divider */}
      <div className={styles.curveTop}>
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className={styles.dividerSvg}>
          <path d="M0,0 Q720,80 1440,0 L1440,80 L0,80 Z" fill="var(--color-off-white)" />
        </svg>
      </div>

      <div className={styles.contentWrapper}>
        {/* Header with watermark quotes in the background */}
        <div className={styles.header} ref={headerRef}>
          <span className={styles.badgeWatermark}>“</span>
          <span className={styles.badge}>Experiências reais. Sorrisos reais.</span>
          <h2 className={styles.headline}>O que nossos pacientes dizem</h2>
        </div>

        {/* Central Slider Module */}
        <div className={styles.sliderContainer} ref={sliderRef}>
          <button onClick={handlePrev} className={styles.arrowButton} aria-label="Depoimento anterior">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.arrowIcon}>
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className={styles.cardWrapper}>
            <div className={styles.cardContent} ref={cardContentRef}>
              {/* Overlapping Avatar */}
              <div className={styles.avatarWrapper}>
                <Image
                  src={current.avatar}
                  alt={current.nome}
                  width={90}
                  height={90}
                  className={styles.avatar}
                />
              </div>

              {/* Card Body */}
              <div className={styles.cardBody}>
                <p className={styles.text}>&ldquo;{current.texto}&rdquo;</p>
              </div>

              {/* Reviewer Details */}
              <div className={styles.reviewerMeta}>
                <div className={styles.googleIdentity}>
                  <svg className={styles.googleGIcon} viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className={styles.reviewerName}>{current.nome}</span>
                </div>
                <div className={styles.stars}>
                  {'★'.repeat(current.nota)}
                </div>
              </div>
            </div>
          </div>

          <button onClick={handleNext} className={styles.arrowButton} aria-label="Próximo depoimento">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.arrowIcon}>
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Footer Google Badge & CTA */}
        <div className={styles.googleFooter}>
          <div className={styles.googleLogoText}>Google</div>
          <div className={styles.googleRating}>
            <span>Reviews 4.9</span>
            <span className={styles.badgeStars}>★★★★★</span>
          </div>
          <a
            href="https://maps.google.com/?q=Aura+Odontologia+Palhoca"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewReviewsBtn}
          >
            VER TODAS AS AVALIAÇÕES
          </a>
        </div>
      </div>

    </section>
  );
}
