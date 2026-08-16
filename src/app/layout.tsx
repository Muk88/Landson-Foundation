import RootLayoutClient from '@/components/layout/RootLayoutClient'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Barlow_Condensed, Barlow_Semi_Condensed, Lato } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'

// ─── Display Font: hero titles, giant stat numbers ──────────────────────────
const barlowCondensed = Barlow_Condensed({
    subsets: ['latin'],
    variable: '--font-display',
    weight: ['600', '700', '800', '900'],
    display: 'swap',
})

// ─── Heading Font: all section h1–h4 ────────────────────────────────────────
const barlowSemiCondensed = Barlow_Semi_Condensed({
    subsets: ['latin'],
    variable: '--font-heading',
    weight: ['400', '500', '600', '700', '800'],
    display: 'swap',
})

// ─── Body Font: prose, descriptions, UI text ────────────────────────────────
const lato = Lato({
    subsets: ['latin'],
    variable: '--font-body',
    weight: ['300', '400', '700', '900'],
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Landson Foundation | Talent for Education',
    description: 'Supporting athletes through education in Nandi, Kenya. Nurturing talent, empowering futures.',
    keywords: ['nonprofit', 'education', 'athletics', 'Kenya', 'Nandi', 'scholarships'],
    authors: [{ name: 'Landson Foundation' }],
    openGraph: {
        title: 'Landson Foundation | Talent for Education',
        description: 'Supporting athletes through education in Nandi, Kenya',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${barlowCondensed.variable} ${barlowSemiCondensed.variable} ${lato.variable}`}>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body>
                <RootLayoutClient header={<Header />} footer={<Footer />}>
                    {children}
                </RootLayoutClient>
            </body>
        </html>
    )
}
