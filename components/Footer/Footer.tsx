'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Footer.module.css';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const colsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      if (!footerRef.current) return;

      // Animate columns and sections
      gsap.from(colsRef.current, {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    },
    { scope: footerRef }
  );

  return (
    <footer className={styles.footer} ref={footerRef} id="footer">
      {/* 1. Map Section at the top */}
      <div className={styles.mapContainer}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3534.6989445100067!2d-48.66532432367468!3d-27.633857576226107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x952735748aebdf87%3A0xe54d92cd9d99dbdf!2sAv.%20At%C3%ADlio%20Pedro%20Pagani%2C%201109%20-%20Pagani%2C%20Palho%C3%A7a%20-%20SC%2C%2088132-149!5e0!3m2!1spt-BR!2sbr!4v1718105000000!5m2!1spt-BR!2sbr"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Supreme Odontologia no Google Maps"
          className={styles.mapIframe}
        />
      </div>

      {/* 2. Main Footer Wrapper with Blue Background */}
      <div className={styles.mainFooter}>
        {/* Logo Overlapping Container */}
        <div className={styles.logoWrapper}>
          <div className={styles.logoCard}>
            <Image
              src="/images/LOGO.png"
              alt="Supreme Odontologia"
              width={200}
              height={60}
              style={{ objectFit: 'contain' }}
              className={styles.logoImg}
            />
          </div>
        </div>

        <div className={styles.contentContainer}>
          {/* Horizontal Social Line */}
          <div className={styles.socialBar}>
            <div className={styles.socialLine} />
            <div className={styles.socials}>
              <a
                href="https://facebook.com/supremeodontologiasc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/supremeodontologiasc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://wa.me/5548991190203"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-3.818c1.654.982 3.511 1.501 5.409 1.502 5.55 0 10.065-4.514 10.068-10.066.002-2.69-1.043-5.22-2.943-7.123-1.9-1.903-4.431-2.951-7.126-2.952-5.553 0-10.068 4.515-10.072 10.069-.001 1.993.521 3.941 1.512 5.658L1.573 21.8l4.074-1.618z" />
                </svg>
              </a>
            </div>
            <div className={styles.socialLine} />
          </div>

          {/* Columns Section */}
          <div className={styles.columns}>
            {/* Col 1 - Contact Info */}
            <div
              className={styles.col}
              ref={(el) => {
                if (el) colsRef.current[0] = el;
              }}
            >
              <h3 className={styles.colTitle}>CONTATO</h3>
              <ul className={styles.contactList}>
                <li>
                  <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>
                    Av. Atílio Pedro Pagani, 1109<br />
                    Pagani, Palhoça - SC, 88132-149
                  </span>
                </li>
                <li>
                  <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <a href="mailto:supremeodontologiasc@gmail.com">supremeodontologiasc@gmail.com</a>
                </li>
                <li>
                  <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  <a href="tel:48991190203">(48) 99119-0203</a>
                </li>
              </ul>
            </div>

            {/* Col 2 - Quick Links */}
            <div
              className={styles.col}
              ref={(el) => {
                if (el) colsRef.current[1] = el;
              }}
            >
              <h3 className={styles.colTitle}>LINKS RÁPIDOS</h3>
              <ul className={styles.linksList}>
                <li><a href="#hero">Início</a></li>
                <li><a href="#sobre">Sobre Nós</a></li>
                <li><a href="#servicos">Tratamentos</a></li>
                <li><a href="#depoimentos">Depoimentos</a></li>
                <li><a href="#equipe">Equipe</a></li>
                <li><a href="#contato">Fale Conosco</a></li>
              </ul>
            </div>

            {/* Col 3 - Dental Services */}
            <div
              className={styles.col}
              ref={(el) => {
                if (el) colsRef.current[2] = el;
              }}
            >
              <h3 className={styles.colTitle}>TRATAMENTOS</h3>
              <ul className={styles.linksList}>
                <li><a href="#servicos">Odontologia Geral</a></li>
                <li><a href="#servicos">Odontologia Estética</a></li>
                <li><a href="#servicos">Reabilitação Oral</a></li>
                <li><a href="#servicos">Clareamento Dental</a></li>
                <li><a href="#servicos">Implantes Dentários</a></li>
                <li><a href="#servicos">Aparelho Ortodôntico</a></li>
              </ul>
            </div>
          </div>

          <div className={styles.divider} />

          {/* Bottom Bar */}
          <div className={styles.bottomBar}>
            <div className={styles.copyright}>
              Copyright © {new Date().getFullYear()} Supreme Odontologia. Todos os direitos reservados.
            </div>
            <div className={styles.legalLinks}>
              <a href="/politica-de-privacidade">Política de Privacidade</a>
              <span className={styles.legalSeparator}>|</span>
              <a href="/acessibilidade">Acessibilidade</a>
              <span className={styles.legalSeparator}>|</span>
              <a href="/termos">Termos & Condições</a>
            </div>
            <div className={styles.technicals}>
              Resp. Técnicos: Dr. Lucas Corrêa de Medeiros (CRO-SC Pendente) & Dr. Antonio Pedro Tolentino (CRO-SC Pendente)
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
