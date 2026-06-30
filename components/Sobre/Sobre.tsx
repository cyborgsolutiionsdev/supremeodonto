'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Sobre.module.css';

gsap.registerPlugin(ScrollTrigger);

interface SobreProps {
  doctorImageSrc: string;
  doctorImageAlt: string;
}

export function Sobre({ doctorImageSrc, doctorImageAlt }: SobreProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const parasRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const doctorCardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const paras = parasRef.current.filter(Boolean) as HTMLParagraphElement[];

      // Initial state
      gsap.set(imageWrapperRef.current, { x: -60, opacity: 0 });
      gsap.set([badgeRef.current, headlineRef.current], { y: 40, opacity: 0 });
      gsap.set(paras, { y: 30, opacity: 0 });
      gsap.set(doctorCardRef.current, { scale: 0.95, opacity: 0 });

      // ScrollTrigger for entry animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();

          // Image entry
          tl.to(imageWrapperRef.current, {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
          }, 0);

          // Text entry
          tl.to([badgeRef.current, headlineRef.current], {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
          }, 0.2);

          tl.to(paras, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
          }, 0.4);

          tl.to(doctorCardRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
          }, 0.8);
        },
      });

      // Parallax on image inside wrapper
      if (imageRef.current) {
        gsap.fromTo(imageRef.current, 
          { y: 0 },
          {
            y: -40,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            }
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section id="sobre" className={styles.section} ref={sectionRef}>
      <svg className={styles.watermark} viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <path d="M30,20 C30,10 40,5 50,15 C60,5 70,10 70,20 C75,35 65,45 60,60 C55,75 55,85 55,90 C55,95 45,95 45,90 C45,85 45,75 40,60 C35,45 25,35 30,20 Z" stroke="var(--color-navy)" strokeWidth="4" />
      </svg>
      
      <div className={styles.container}>
        <div className={styles.imageWrapper} ref={imageWrapperRef}>
          <Image 
            ref={imageRef}
            src={doctorImageSrc} 
            alt={doctorImageAlt} 
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        
        <div className={styles.textContent}>
          <h2 className={styles.headline} ref={headlineRef}>
            <span className={styles.eyebrow} ref={badgeRef}>Nossa História</span>
            Uma clínica construída sobre amizade e propósito
          </h2>
          
          <p className={styles.paragraph} ref={el => { parasRef.current[0] = el; }}>
            A Aura nasceu de um sonho que nós, Dr. Roberto Silva Santos e Dr. Carlos Eduardo Costa, compartilhamos desde a faculdade: criar uma clínica onde o atendimento fosse realmente sobre pessoas — e não só sobre dentes. Durante a graduação, víamos de perto como o atendimento odontológico podia ser impessoal e distante, e sabíamos que era possível fazer diferente.
          </p>
          <p className={styles.paragraph} ref={el => { parasRef.current[1] = el; }}>
            Quando surgiu a oportunidade de montar a nossa clínica no Centro de Florianópolis, a decisão foi imediata. Queríamos construir um espaço acolhedor, onde o paciente se sentisse em casa, fosse ouvido e tivesse acompanhamento real. Hoje, cada detalhe da Aura Odontologia reflete esse propósito: da tecnologia digital às salas climatizadas, tudo foi planejado para tornar o seu atendimento mais leve, humano e verdadeiro.
          </p>
          
          <div className={styles.doctorCard} ref={doctorCardRef}>
            <div className={styles.doctorPhoto}>
              <Image 
                src={doctorImageSrc} 
                alt={doctorImageAlt} 
                fill 
                className={styles.image} 
              />
            </div>
            <div className={styles.doctorInfo}>
              <span className={styles.doctorName}>Dr. Roberto & Dr. Carlos Eduardo</span>
              <span className={styles.doctorSpec}>Fundadores & Responsáveis Clínicos</span>
              <span className={styles.doctorSocial}>@auraodontologia.demo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
