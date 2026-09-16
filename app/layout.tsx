import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SmoothScroll from '@/components/smooth-scroll'
import { PageLoader } from '@/components/animations/PageLoader'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://brycenw.com'),
  title: 'Brycen Wong | Full Stack & AI Developer',
  description: 'Senior Full-Stack Developer and AI Engineer building scalable AI, Mobile and Web products.',
  alternates: {
    canonical: 'https://brycenw.com',
  },
  openGraph: {
    title: 'Brycen Wong Portfolio',
    description: 'Full Stack & AI Developer building real-world platforms and scalable AI assessment engines',
    url: 'https://brycenw.com',
    siteName: 'Brycen Wong Portfolio',
    type: 'website',
    images: [
      {
        url: '/preview.png',
        width: 1200,
        height: 630,
        alt: 'Brycen Wong - Full Stack Developer & AI Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brycen Wong Portfolio',
    description: 'Senior Full-Stack Developer and AI Engineer building scalable AI, Mobile and Web products',
    images: ['/preview.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="google-site-verification" content="t2QA9FzpxfH7zBeYD5BFhypDt-chnwCMAIjYzotmdKg" />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased selection:bg-cyan-500/30 selection:text-cyan-200 relative`}>
        <PageLoader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
