'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './FormContato.module.css';

gsap.registerPlugin(ScrollTrigger);

export function FormContato() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  // Form State
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [servico, setServico] = useState('');
  const [mensagem, setMensagem] = useState('');

  // Error State
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Section fade/slide in animations
      gsap.from(leftColRef.current, {
        x: -40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      gsap.from(rightColRef.current, {
        x: 40,
        opacity: 0,
        duration: 0.9,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  // Button GSAP hover animations
  const handleMouseEnter = () => {
    if (submitBtnRef.current) {
      gsap.to(submitBtnRef.current, {
        scale: 1.03,
        filter: 'brightness(1.1)',
        duration: 0.3,
        ease: 'power3.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (submitBtnRef.current) {
      gsap.to(submitBtnRef.current, {
        scale: 1,
        filter: 'brightness(1)',
        duration: 0.3,
        ease: 'power3.out',
      });
    }
  };

  // Helper to format/validate phone number input
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    let formatted = raw;
    if (raw.length > 2) {
      formatted = `(${raw.substring(0, 2)}) ` + raw.substring(2);
    }
    if (raw.length > 7) {
      formatted = `(${raw.substring(0, 2)}) ${raw.substring(2, 7)}-${raw.substring(7, 11)}`;
    }
    setTelefone(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const tempErrors: { [key: string]: string } = {};

    // Validate Nome
    if (nome.trim().length < 2) {
      tempErrors.nome = 'O nome precisa ter pelo menos 2 caracteres.';
    }

    // Validate Telefone
    const digits = telefone.replace(/\D/g, '');
    if (digits.length < 10) {
      tempErrors.telefone = 'Por favor, insira um telefone válido com DDD (mínimo 10 dígitos).';
    }

    // Validate Serviço
    if (!servico) {
      tempErrors.servico = 'Por favor, selecione um tratamento de interesse.';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setErrors({});

    // Build WhatsApp message
    const msg = encodeURIComponent(
      `Olá! Vim pelo site da Supreme Odontologia.\n\n` +
      `Nome: ${nome.trim()}\n` +
      `Telefone: ${telefone.trim()}\n` +
      `Interesse: ${servico}\n` +
      `${mensagem.trim() ? 'Mensagem: ' + mensagem.trim() + '\n' : ''}` +
      `\nGostaria de agendar uma avaliação gratuita. 😊`
    );

    window.open(`https://wa.me/5548991190203?text=${msg}`, '_blank');
  };

  return (
    <section id="contato" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        {/* Left Column - Persuasive Content */}
        <div className={styles.leftCol} ref={leftColRef}>
          <span className={styles.badge}>Agende Agora</span>
          <h2 className={styles.headline}>Sua avaliação é gratuita e sem compromisso</h2>
          <p className={styles.sub}>
            Preencha ao lado e receba o retorno em minutos pelo WhatsApp.
          </p>

          <ul className={styles.benefits}>
            <li className={styles.benefitItem}>
              <span className={styles.icon}>✓</span>
              <div>
                <strong>Avaliação gratuita</strong>
                <p>Análise completa do seu sorriso sem custo inicial.</p>
              </div>
            </li>
            <li className={styles.benefitItem}>
              <span className={styles.icon}>✓</span>
              <div>
                <strong>Sem filas — horários exclusivos</strong>
                <p>Atendimento planejado individualmente para seu conforto.</p>
              </div>
            </li>
            <li className={styles.benefitItem}>
              <span className={styles.icon}>✓</span>
              <div>
                <strong>Estacionamento disponível</strong>
                <p>Fácil acesso e conveniência no coração do Pagani.</p>
              </div>
            </li>
            <li className={styles.benefitItem}>
              <span className={styles.icon}>✓</span>
              <div>
                <strong>Pagamento facilitado</strong>
                <p>Condições especiais para o seu plano de tratamento.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Right Column - Form */}
        <div className={styles.rightCol} ref={rightColRef}>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.fieldGroup}>
              <label htmlFor="form-nome" className={styles.label}>
                Seu Nome Completo *
              </label>
              <input
                type="text"
                id="form-nome"
                className={`${styles.input} ${errors.nome ? styles.inputError : ''}`}
                placeholder="Ex: Ana Silva"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
              {errors.nome && <span className={styles.errorText}>{errors.nome}</span>}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="form-tel" className={styles.label}>
                Telefone / WhatsApp *
              </label>
              <input
                type="tel"
                id="form-tel"
                className={`${styles.input} ${errors.telefone ? styles.inputError : ''}`}
                placeholder="(48) 99999-9999"
                value={telefone}
                onChange={handlePhoneChange}
                required
              />
              {errors.telefone && <span className={styles.errorText}>{errors.telefone}</span>}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="form-servico" className={styles.label}>
                Tratamento de Interesse *
              </label>
              <div className={styles.selectWrapper}>
                <select
                  id="form-servico"
                  className={`${styles.select} ${errors.servico ? styles.inputError : ''}`}
                  value={servico}
                  onChange={(e) => setServico(e.target.value)}
                  required
                >
                  <option value="">Selecione o tratamento de interesse</option>
                  <option value="Lentes de Contato Dental">Lentes de Contato Dental</option>
                  <option value="Facetas de Porcelana">Facetas de Porcelana</option>
                  <option value="Clareamento Dental">Clareamento Dental</option>
                  <option value="Implante Dentário">Implante Dentário</option>
                  <option value="Ortodontia (Aparelho)">Ortodontia (Aparelho)</option>
                  <option value="Harmonização Orofacial">Harmonização Orofacial</option>
                  <option value="Tratamento de Canal">Tratamento de Canal</option>
                  <option value="Avaliação Geral">Avaliação Geral</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              {errors.servico && <span className={styles.errorText}>{errors.servico}</span>}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="form-msg" className={styles.label}>
                Mensagem Adicional (Opcional)
              </label>
              <textarea
                id="form-msg"
                className={styles.textarea}
                placeholder="Conte brevemente o que deseja ou o melhor horário para entrarmos em contato..."
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                rows={3}
              />
            </div>

            <button
              type="submit"
              ref={submitBtnRef}
              className={styles.submitBtn}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <svg className={styles.whatsIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.727-1.465L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.864-9.83.002-2.623-1.023-5.086-2.884-6.948C16.59 1.952 14.129 1.258 11.97 1.258c-5.437 0-9.863 4.414-9.867 9.831-.001 1.73.461 3.42 1.339 4.916l-.988 3.604 3.704-.972zm12.355-6.52c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="currentColor"/>
              </svg>
              Agendar via WhatsApp
            </button>

            <span className={styles.lgpd}>
              Ao enviar, você concorda com nossa Política de Privacidade. Seus dados são usados apenas para contato.
            </span>
          </form>
        </div>
      </div>
    </section>
  );
}
