import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-body',
    display: 'swap',
})

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-heading',
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
        <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body>{children}</body>
        </html>
    )
}
