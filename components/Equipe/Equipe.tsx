'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Equipe.module.css';

gsap.registerPlugin(ScrollTrigger);

const unifiedLead = {
  nome: 'Dr. Roberto & Dr. Carlos Eduardo',
  cargo: 'Dentistas / Sócios-Fundadores',
  cro: 'CRO-SC 12345',
  imagem: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1200&auto=format&fit=crop',
  instagram: '@auraodontologia.demo',
  whatsapp: 'https://wa.me/5548991190203?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta%20com%20os%20Dr.%20Roberto%20e%20Dr.%20Carlos%20Eduardo.',
  bios: [
    'A Aura Odontologia nasceu de um sonho compartilhado desde a faculdade pelos doutores Roberto Silva Santos e Carlos Eduardo Costa: criar uma clínica de alto padrão focada no bem-estar real das pessoas, onde o atendimento fosse leve, humano e transparente.',
    'Unindo suas especialidades em estética avançada, reabilitação oral e ortodontia moderna, os doutores integram sensibilidade clínica e tecnologia digital de ponta (como o scanner 3D e raio-x digital) para planejar e executar sorrisos com precisão e máximo conforto.',
    'Na Aura, cada etapa do seu tratamento é planejada e executada diretamente pelos fundadores, garantindo proximidade, segurança e a certeza de que você nunca estará sozinho na sua jornada de transformação.'
  ]
};

const supportingTeam = [
  {
    nome: 'Dra. Beatriz Fernandes',
    cargo: 'Dentista Especialista',
    detalhe: 'Estética Dental & Próteses',
    imagem: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=600&auto=format&fit=crop',
  },
  {
    nome: 'Tatiana Souza',
    cargo: 'Coordenadora Financeira',
    detalhe: 'Planejamento e Convênios',
    imagem: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
  },
  {
    nome: 'Claudio Mello',
    cargo: 'Recepcionista Head',
    detalhe: 'Atendimento & Agenda',
    imagem: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop',
  },
  {
    nome: 'Marcos Santos',
    cargo: 'Auxiliar de Saúde Bucal',
    detalhe: 'Suporte Clínico & ASB',
    imagem: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
  }
];

export function Equipe() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leadCardRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Header entrance
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        }
      });

      // Lead card entrance
      if (leadCardRef.current) {
        gsap.from(leadCardRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leadCardRef.current,
            start: 'top 75%',
            once: true,
          }
        });
      }

      // Supporting team entrance
      if (supportRef.current) {
        gsap.from(supportRef.current.children, {
          y: 40,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: supportRef.current,
            start: 'top 80%',
            once: true,
          }
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section id="equipe" className={styles.section} ref={sectionRef}>
      {/* Wave top divider – matches Depoimentos (off-white) so only the shape separates */}
      <div className={styles.curveTop}>
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className={styles.dividerSvg}>
          <path d="M0,80 Q720,0 1440,80 L1440,0 L0,0 Z" fill="var(--color-off-white)" />
        </svg>
      </div>

      {/* 1. Header (Dark Navy Block) */}
      <div className={styles.headerContainer}>
        <div className={styles.header} ref={headerRef}>
          <span className={styles.badge}>Quem cuida de você</span>
          <h2 className={styles.headline}>Nossa Equipe de Especialistas</h2>
        </div>
      </div>

      {/* 2. Content (Off-White Background) */}
      <div className={styles.contentContainer}>
        <div className={styles.wrapper}>

          {/* Unified Lead Dentist Card */}
          <div className={styles.leadCard} ref={leadCardRef}>
            {/* Image Column */}
            <div className={styles.imageColumn}>
              <div className={styles.organicImageWrapper}>
                <Image
                  src={unifiedLead.imagem}
                  alt={unifiedLead.nome}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className={styles.organicImage}
                  priority
                />
                {/* Floating smile badge icon representing brand overlap */}
                <div className={styles.floatingSmileIcon}>
                  <svg viewBox="0 0 100 100" fill="none" className={styles.smileSvg}>
                    <path d="M20,50 Q50,90 80,50" stroke="var(--color-navy)" strokeWidth="8" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bio Column */}
            <div className={styles.bioColumn}>
              <h3 className={styles.leadName}>{unifiedLead.nome}</h3>
              <div className={styles.leadRoleBadge}>
                <span>{unifiedLead.cargo}</span>
                <span className={styles.leadCro}>{unifiedLead.cro}</span>
              </div>

              <div className={styles.leadBioText}>
                {unifiedLead.bios.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              <a
                href={unifiedLead.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.leadCta}
              >
                Conhecer os Doutores
              </a>
            </div>
          </div>

          {/* Section Split Title */}
          <div className={styles.splitTitleContainer}>
            <div className={styles.splitLine} />
            <h3 className={styles.splitTitle}>Equipe de Apoio & Atendimento</h3>
            <div className={styles.splitLine} />
          </div>

          {/* 3. Supporting Team Grid */}
          <div className={styles.supportGrid} ref={supportRef}>
            {supportingTeam.map((member, idx) => (
              <div key={idx} className={styles.supportCard}>
                <div className={styles.supportImageContainer}>
                  <div className={styles.supportOrganicWrapper}>
                    <Image
                      src={member.imagem}
                      alt={member.nome}
                      fill
                      sizes="(max-width: 768px) 150px, 200px"
                      className={member.nome === 'Dra. Beatriz Fernandes' ? styles.draFernandaImage : styles.organicImage}
                    />
                  </div>
                </div>
                <div className={styles.supportInfo}>
                  <h4 className={styles.supportName}>{member.nome}</h4>
                  <span className={styles.supportRole}>{member.cargo}</span>
                  <span className={styles.supportDetail}>{member.detalhe}</span>
                  <a
                    href="https://wa.me/5548991190203?text=Olá!%20Gostaria%20de%20agendar%20um%20horário na Aura."
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.supportLink}
                  >
                    Falar Conosco
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Wave bottom divider – matches FormContato (navy-light) so only the shape separates */}
      <div className={styles.curveBottom}>
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className={styles.dividerSvg}>
          <path d="M0,0 Q720,80 1440,0 L1440,80 L0,80 Z" fill="var(--color-navy-light)" />
        </svg>
      </div>
    </section>
  );
}
