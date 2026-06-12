'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './DiferencialBar.module.css';

gsap.registerPlugin(ScrollTrigger);

export function DiferencialBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const items = itemsRef.current.filter(Boolean) as HTMLElement[];

      gsap.set(items, { y: 40, opacity: 0 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%', // 20% into viewport
        once: true,
        onEnter: () => {
          // Fade up items
          gsap.to(items, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
          });
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.grid}>
        {/* Item 1 */}
        <div className={styles.item} ref={el => { itemsRef.current[0] = el; }}>
          <div className={styles.numberContainer}>
            <span className={styles.number}>Scanner 3D</span>
          </div>
          <span className={styles.label}>Sem moldagens desconfortáveis</span>
        </div>

        {/* Item 2 */}
        <div className={styles.item} ref={el => { itemsRef.current[1] = el; }}>
          <div className={styles.numberContainer}>
            <span className={styles.number}>5 ★ Google</span>
          </div>
          <span className={styles.label}>Avaliação dos nossos pacientes</span>
        </div>

        {/* Item 3 */}
        <div className={styles.item} ref={el => { itemsRef.current[2] = el; }}>
          <div className={styles.numberContainer}>
            <span className={styles.number}>Uniodonto</span>
          </div>
          <span className={styles.label}>Convênio aceito</span>
        </div>

        {/* Item 4 */}
        <div className={styles.item} ref={el => { itemsRef.current[3] = el; }}>
          <div className={styles.numberContainer}>
            <span className={styles.number}>2</span>
          </div>
          <span className={styles.label}>Fundadores se dedicam 100% a você</span>
        </div>
      </div>
    </section>
  );
}
