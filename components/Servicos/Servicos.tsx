'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Servicos.module.css';

gsap.registerPlugin(ScrollTrigger);

const categoriasServicos = [
  {
    id: 'general',
    titulo: 'Odontologia Geral',
    descricao: 'Check-ups de rotina, limpezas profiláticas e cuidados preventivos para manter a saúde bucal da sua família sempre em dia.',
    imgSrc: '/images/servico-clinico.jpg',
    imgAlt: 'Consulta odontológica de rotina na Aura Odontologia',
  },
  {
    id: 'cosmetic',
    titulo: 'Odontologia Estética',
    descricao: 'Transformação do sorriso com lentes de contato dental ultrafinas, facetas de porcelana e clareamento dental seguro e sem sensibilidade.',
    imgSrc: '/images/servico-estetico.jpg',
    imgAlt: 'Sorriso estético transformado na Aura Odontologia',
  },
  {
    id: 'rehabilitation',
    titulo: 'Reabilitação Oral',
    descricao: 'Restauração completa de sorrisos com implantes dentários de titânio, próteses fixas e tratamentos de canal confortáveis e precisos.',
    imgSrc: '/images/servico-reabilitacao.jpg',
    imgAlt: 'Tratamento de reabilitação e implante dentário',
  },
];

export function Servicos() {
  const containerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !stickyRef.current) return;

      const mm = gsap.matchMedia();

      // Desktop layout and scroll camera
      mm.add("(min-width: 769px)", () => {
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

        // Background changes gradually
        tl.to(stickyRef.current, {
          backgroundColor: 'var(--color-charcoal)',
          duration: 1,
          ease: 'none',
        }, 0);

        // Parallax effect on Title
        tl.to(titleRef.current, {
          y: -30,
          ease: 'none',
        }, 0);

        // Card 1: slides in from left
        tl.fromTo(
          card1Ref.current,
          { xPercent: -120, opacity: 0 },
          { xPercent: 0, opacity: 1, ease: 'power2.out' },
          0.2
        );

        // Card 2: slides up from bottom
        tl.fromTo(
          card2Ref.current,
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, ease: 'power2.out' },
          0.45
        );

        // Card 3: slides in from right
        tl.fromTo(
          card3Ref.current,
          { xPercent: 120, opacity: 0 },
          { xPercent: 0, opacity: 1, ease: 'power2.out' },
          0.7
        );
      });

      // Mobile reveal: scroll cards naturally and slide/fade them in
      mm.add("(max-width: 768px)", () => {
        const title = titleRef.current;
        if (title) {
          gsap.fromTo(title,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                once: true,
              }
            }
          );
        }

        const cards = [card1Ref.current, card2Ref.current, card3Ref.current].filter(Boolean) as HTMLDivElement[];
        cards.forEach((card, idx) => {
          gsap.fromTo(card,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: idx * 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                once: true,
              }
            }
          );
        });
      });

      // Hover lifts on cards
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current].filter(Boolean) as HTMLDivElement[];
      const hoverTimelines: gsap.core.Tween[] = [];

      cards.forEach((card, index) => {
        const onMouseEnter = () => {
          hoverTimelines[index] = gsap.to(card, {
            y: -10,
            borderColor: 'var(--color-gold)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
            duration: 0.3,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        };

        const onMouseLeave = () => {
          hoverTimelines[index] = gsap.to(card, {
            y: 0,
            borderColor: 'rgba(255, 255, 255, 0.08)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            duration: 0.3,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        };

        card.addEventListener('mouseenter', onMouseEnter);
        card.addEventListener('mouseleave', onMouseLeave);

        // Clean up listeners on scope revert
        return () => {
          card.removeEventListener('mouseenter', onMouseEnter);
          card.removeEventListener('mouseleave', onMouseLeave);
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <section id="servicos" className={styles.section} ref={containerRef}>
      <div className={styles.stickyArea} ref={stickyRef}>
        <div className={styles.header} ref={titleRef}>
          <span className={styles.badge}>Nossos Tratamentos</span>
          <h2 className={styles.headline}>
            Odontologia <span>Completa</span>
          </h2>
        </div>

        <div className={styles.cardsContainer} ref={cardsContainerRef}>
          {/* Card 1 - Odontologia Geral */}
          <div className={styles.card} ref={card1Ref}>
            <div className={styles.imageWrapper}>
              <Image
                src={categoriasServicos[0].imgSrc}
                alt={categoriasServicos[0].imgAlt}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className={styles.image}
              />
              <div className={styles.imageOverlay} />
              <div className={styles.cardContent}>
                <h3 className={styles.title}>{categoriasServicos[0].titulo}</h3>
                <p className={styles.desc}>{categoriasServicos[0].descricao}</p>
                <a href="#contato" className={styles.link}>Saber Mais →</a>
              </div>
            </div>
          </div>

          {/* Card 2 - Odontologia Estética */}
          <div className={styles.card} ref={card2Ref}>
            <div className={styles.imageWrapper}>
              <Image
                src={categoriasServicos[1].imgSrc}
                alt={categoriasServicos[1].imgAlt}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className={styles.image}
              />
              <div className={styles.imageOverlay} />
              <div className={styles.cardContent}>
                <h3 className={styles.title}>{categoriasServicos[1].titulo}</h3>
                <p className={styles.desc}>{categoriasServicos[1].descricao}</p>
                <a href="#contato" className={styles.link}>Saber Mais →</a>
              </div>
            </div>
          </div>

          {/* Card 3 - Reabilitação Oral */}
          <div className={styles.card} ref={card3Ref}>
            <div className={styles.imageWrapper}>
              <Image
                src={categoriasServicos[2].imgSrc}
                alt={categoriasServicos[2].imgAlt}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className={styles.image}
              />
              <div className={styles.imageOverlay} />
              <div className={styles.cardContent}>
                <h3 className={styles.title}>{categoriasServicos[2].titulo}</h3>
                <p className={styles.desc}>{categoriasServicos[2].descricao}</p>
                <a href="#contato" className={styles.link}>Saber Mais →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
