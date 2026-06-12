'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ScrollCamera.module.css';

gsap.registerPlugin(ScrollTrigger);

const cameraImages = [
  {
    src: '/images/clinica-01.jpg',
    alt: 'Consultório Moderno e Confortável da Supreme Odontologia',
    title: 'Estrutura Premium',
  },
  {
    src: '/images/scanner-3d.jpg',
    alt: 'Scanner 3D Intraoral digitalizando sorrisos',
    title: 'Scanner 3D Digital',
  },
  {
    src: '/images/hero-medicos.jpg',
    alt: 'Profissionais dedicados no atendimento',
    title: 'Cuidado Exclusivo',
  },
];

export function ScrollCamera() {
  const containerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !stickyRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Background fade from very dark grey (#030303) to charcoal-like dark navy (#0a0a0a)
      tl.to(stickyRef.current, {
        backgroundColor: '#0a0a0a',
        duration: 1,
        ease: 'none',
      }, 0);

      // Title parallax shift upwards by 40px
      tl.to(titleRef.current, {
        y: -40,
        ease: 'none',
      }, 0);

      // Card 1 Animation (starts from scroll ~20%)
      tl.fromTo(
        card1Ref.current,
        { xPercent: -120, opacity: 0 },
        { xPercent: 0, opacity: 1, ease: 'power3.out' },
        0.2 // Stagger timing matching ~20% of timeline
      );

      // Card 2 Animation (starts from scroll ~45%)
      tl.fromTo(
        card2Ref.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power3.out' },
        0.45 // Stagger timing matching ~45% of timeline
      );

      // Card 3 Animation (starts from scroll ~70%)
      tl.fromTo(
        card3Ref.current,
        { xPercent: 120, opacity: 0 },
        { xPercent: 0, opacity: 1, ease: 'power3.out' },
        0.7 // Stagger timing matching ~70% of timeline
      );
    },
    { scope: containerRef }
  );

  return (
    <section className={styles.container} ref={containerRef}>
      <div className={styles.stickyArea} ref={stickyRef}>
        <h2 className={styles.title} ref={titleRef}>
          Tecnologia <span>& Conforto</span>
        </h2>

        <div className={styles.cardsWrapper}>
          {/* Card 1 */}
          <div className={styles.card} ref={card1Ref}>
            <div className={styles.imageContainer}>
              <Image
                src={cameraImages[0].src}
                alt={cameraImages[0].alt}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className={styles.image}
              />
              <div className={styles.overlay} />
            </div>
            <h3 className={styles.cardTitle}>{cameraImages[0].title}</h3>
          </div>

          {/* Card 2 */}
          <div className={styles.card} ref={card2Ref}>
            <div className={styles.imageContainer}>
              <Image
                src={cameraImages[1].src}
                alt={cameraImages[1].alt}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className={styles.image}
              />
              <div className={styles.overlay} />
            </div>
            <h3 className={styles.cardTitle}>{cameraImages[1].title}</h3>
          </div>

          {/* Card 3 */}
          <div className={styles.card} ref={card3Ref}>
            <div className={styles.imageContainer}>
              <Image
                src={cameraImages[2].src}
                alt={cameraImages[2].alt}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className={styles.image}
              />
              <div className={styles.overlay} />
            </div>
            <h3 className={styles.cardTitle}>{cameraImages[2].title}</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
