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
  title: 'Supreme Odontologia | Estética Dental em Palhoça - SC',
  description:
    'Transforme seu sorriso com a melhor odontologia estética de Palhoça. Lentes de contato dental em sessão única, clareamento, implantes e harmonização orofacial no Pagani.',
  keywords: [
    'odontologia',
    'estética dental',
    'lentes de contato dental',
    'clareamento dental',
    'harmonização orofacial',
    'implante dentário',
    'Palhoça',
    'Pagani',
    'dentista Palhoça',
    'Dra Fernanda Fernandes',
  ],
  authors: [{ name: 'Dra. Fernanda Fernandes de Souza Bastos' }],
  creator: 'Supreme Odontologia',
  openGraph: {
    title: 'Supreme Odontologia | Estética Dental em Palhoça - SC',
    description:
      'Lentes de contato dental ultrafinas sem desgaste em sessão única. Dra. Fernanda Fernandes no coração do Pagani.',
    url: 'https://supremeodontologia.com.br', // Example domain
    siteName: 'Supreme Odontologia',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://supremeodontologia.com.br/images/hero-medicos.jpg',
        width: 1200,
        height: 630,
        alt: 'Dra. Fernanda Fernandes e equipe da Supreme Odontologia',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://supremeodontologia.com.br',
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
              name: 'Supreme Odontologia',
              image: 'https://supremeodontologia.com.br/images/hero-medicos.jpg',
              '@id': 'https://supremeodontologia.com.br/#dentist',
              url: 'https://supremeodontologia.com.br',
              telephone: '+5548991190203',
              priceRange: '$$',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Av. Atílio Pedro Pagani, nº 1109',
                addressLocality: 'Palhoça',
                addressRegion: 'SC',
                postalCode: '88132-149',
                addressCountry: 'BR',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: -27.6338,
                longitude: -48.6653,
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
                'https://instagram.com/supremeodontologiasc',
                'https://facebook.com/supremeodontologiasc',
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
