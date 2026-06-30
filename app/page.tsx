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
              heroImageSrc="/images/doctors-lead.jpg"
              heroImageAlt="Dr. Roberto Silva e Dr. Carlos Eduardo na Aura Odontologia"
            />
            <DiferencialBar />
            <Sobre
              doctorImageSrc="/images/doctors-lead.jpg"
              doctorImageAlt="Dr. Roberto & Dr. Carlos Eduardo"
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
