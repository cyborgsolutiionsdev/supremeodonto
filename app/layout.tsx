import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aura Odontologia | Estética Dental de Alta Performance',
  description:
    'Descubra a Aura Odontologia. Lentes de contato, implantes e reabilitação oral com tecnologia digital avançada em nosso mostruário de especialidades.',
  keywords: [
    'odontologia',
    'estética dental',
    'lentes de contato dental',
    'clareamento dental',
    'harmonização orofacial',
    'implante dentário',
    'Florianópolis',
    'mostruário',
  ],
  authors: [{ name: 'Clínica Aura Odontologia' }],
  creator: 'Aura Odontologia',
  openGraph: {
    title: 'Aura Odontologia | Estética Dental de Alta Performance',
    description:
      'Lentes de contato dental ultrafinas sem desgaste em sessão única. Dra. Beatriz Fernandes em nosso espaço clínico fictício.',
    url: 'https://auraodontologia.com.br', // Example domain
    siteName: 'Aura Odontologia',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Dra. Beatriz Fernandes e equipe da Aura Odontologia',
      },
    ],
  },
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://auraodontologia.com.br',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${jost.variable}`}>
      <head>
        {/* Custom JSON-LD schema for LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Dentist',
              name: 'Aura Odontologia',
              image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1200&auto=format&fit=crop',
              '@id': 'https://auraodontologia.com.br/#dentist',
              url: 'https://auraodontologia.com.br',
              telephone: '+5548991190203',
              priceRange: '$$',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Av. das Flores, nº 1200',
                addressLocality: 'Centro',
                addressRegion: 'Florianópolis - SC',
                postalCode: '88010-000',
                addressCountry: 'BR',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: -27.5969,
                longitude: -48.5915,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '08:00',
                  closes: '17:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Saturday'],
                  opens: '08:00',
                  closes: '13:00',
                },
              ],
              sameAs: [
                'https://instagram.com/auraodontologiasc',
                'https://facebook.com/auraodontologiasc',
              ],
            }),
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
