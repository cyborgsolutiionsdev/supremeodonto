'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Localizacao.module.css';

gsap.registerPlugin(ScrollTrigger);

export function Localizacao() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const infoItemsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Header Animation
      gsap.from(`.${styles.badge}, .${styles.headline}`, {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      // Map Entrance
      gsap.from(mapRef.current, {
        opacity: 0,
        scale: 0.97,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: mapRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      // Info Items Stagger
      gsap.from(infoItemsRef.current, {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: infoRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="onde-estamos" className={styles.section} ref={sectionRef}>
      <div className={styles.header}>
        <span className={styles.badge}>Onde Estamos</span>
        <h2 className={styles.headline}>Venha nos visitar</h2>
      </div>

      <div className={styles.container}>
        {/* Left Side: Map Embed */}
        <div className={styles.mapWrapper} ref={mapRef}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3534.6989445100067!2d-48.66532432367468!3d-27.633857576226107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x952735748aebdf87%3A0xe54d92cd9d99dbdf!2sAv.%20At%C3%ADlio%20Pedro%20Pagani%2C%201109%20-%20Pagani%2C%20Palho%C3%A7a%20-%20SC%2C%2088132-149!5e0!3m2!1spt-BR!2sbr!4v1718105000000!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização da Supreme Odontologia no Google Maps"
          />
        </div>

        {/* Right Side: Info & Hours */}
        <div className={styles.infoWrapper} ref={infoRef}>
          <div className={styles.infoList}>
            {/* Address */}
            <div
              className={styles.infoCard}
              ref={(el) => {
                if (el) infoItemsRef.current[0] = el;
              }}
            >
              <div className={styles.iconCol}>
                <svg className={styles.infoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className={styles.textCol}>
                <h3>Endereço</h3>
                <p>Av. Atílio Pedro Pagani, nº 1109</p>
                <p>Pagani, Palhoça - SC, 88132-149</p>
              </div>
            </div>

            {/* Contacts */}
            <div
              className={styles.infoCard}
              ref={(el) => {
                if (el) infoItemsRef.current[1] = el;
              }}
            >
              <div className={styles.iconCol}>
                <svg className={styles.infoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <div className={styles.textCol}>
                <h3>Contato</h3>
                <p>Telefone / WhatsApp: (48) 99119-0203</p>
                <p>E-mail: supremeodontologiasc@gmail.com</p>
              </div>
            </div>

            {/* Hours */}
            <div
              className={styles.infoCard}
              ref={(el) => {
                if (el) infoItemsRef.current[2] = el;
              }}
            >
              <div className={styles.iconCol}>
                <svg className={styles.infoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className={styles.textCol}>
                <h3>Horário de Atendimento</h3>
                <p>Segunda a Sexta: 08:00 – 17:00</p>
                <p>Sábado: 08:00 – 13:00</p>
                <p>Domingo: Fechado</p>
              </div>
            </div>
          </div>

          <div
            className={styles.actions}
            ref={(el) => {
              if (el) infoItemsRef.current[3] = el;
            }}
          >
            <a
              href="https://maps.google.com/?q=Av.+Atílio+Pedro+Pagani,+1109+-+Pagani,+Palhoça+-+SC,+88132-149"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
            >
              Como Chegar
            </a>
            <a
              href="https://wa.me/5548991190203?text=Olá!%20Vim%20pelo%20site%20e%20gostaria%20de%20conversar."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSecondary}
            >
              Fale pelo WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
