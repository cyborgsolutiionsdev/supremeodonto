'use client';

import { useState } from 'react';
import { LoadingScreen } from '../components/LoadingScreen/LoadingScreen';
import { Hero } from '../components/Hero/Hero';
import { DiferencialBar } from '../components/DiferencialBar/DiferencialBar';
import { Sobre } from '../components/Sobre/Sobre';
import { Servicos } from '../components/Servicos/Servicos';
import { Depoimentos } from '../components/Depoimentos/Depoimentos';
import { Equipe } from '../components/Equipe/Equipe';
import { FormContato } from '../components/FormContato/FormContato';
import { CTAFlutuante } from '../components/CTAFlutuante/CTAFlutuante';
import { Footer } from '../components/Footer/Footer';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />
      
      {loaded && (
        <>
          <main>
            <Hero
              heroImageSrc="/images/hero-medicos.jpg"
              heroImageAlt="Dr. Lucas Corrêa e Dr. Antonio Pedro na Supreme Odontologia"
            />
            <DiferencialBar />
            <Sobre
              doctorImageSrc="/images/hero-medicos.jpg"
              doctorImageAlt="Dr. Lucas & Dr. Antonio Pedro Tolentino"
            />
            <Servicos />
            <Depoimentos />
            <Equipe />
            <FormContato />
          </main>
          <Footer />
          <CTAFlutuante />
        </>
      )}
    </>
  );
}
