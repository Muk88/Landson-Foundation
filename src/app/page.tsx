import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { createClient } from '@supabase/supabase-js'
import Button from '@/components/ui/Button'
import AthleteShowcase from '@/components/AthleteShowcase'
import NewsSection from '@/components/home/NewsSection'
import HeroSection from '@/components/home/HeroSection'

// Dynamic imports for heavy interactive components
const WelcomeSection = dynamic(() => import('@/components/WelcomeSection'), {
    ssr: false,
    loading: () => <div className="min-h-[200px] bg-gray-50" />
})
const ImpactSection = dynamic(() => import('@/components/ImpactSection'), {
    ssr: false,
    loading: () => <div className="min-h-[200px] bg-brand-green" />
})
const TrioCarousel = dynamic(() => import('@/components/TrioCarousel'), {
    ssr: false,
    loading: () => <div className="min-h-[200px] bg-gray-100" />
})

export const revalidate = 0

async function getLatestNews() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: news, error } = await supabase
        .from('news')
        .select('*')
        .eq('is_published', true)
        .order('published_date', { ascending: false })
        .limit(3)

    if (error) {
        console.error('Error fetching news:', error)
        return []
    }

    return news.map((item: any) => ({
        id: item.id,
        slug: item.slug,
        title: item.title,
        date: new Date(item.published_date).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        }),
        category: item.category,
        image: item.image_url
    }))
}

export default async function HomePage() {
    const latestNews = await getLatestNews()

    const trioCards = [
        {
            title: 'The Talent',
            description: 'Identifying and nurturing exceptional athletic talent in Nandi County. We scout young athletes with potential and provide them with the support they need to excel in their sport while pursuing education.',
            label: 'Athletic Development',
            image: '/images/runner.jpg',
            link: '/programs',
        },
        {
            title: 'The Education',
            description: 'Providing comprehensive scholarship programs and academic support to talented athletes. We ensure that education remains a priority alongside athletic training, creating well-rounded individuals.',
            label: 'Scholarship Program',
            image: '/images/education.jpg',
            link: '/programs',
        },
        {
            title: 'The Future',
            description: 'Building champions both on the track and in life. Our holistic approach prepares athletes for success in any field they choose, creating leaders who give back to their communities.',
            label: 'Success Stories',
            image: '/images/future.jpg',
            link: '/stories',
        },
    ]

    return (
        <div className="flex flex-col min-h-screen bg-white"><main className="flex-grow pt-[72px] bg-white">
                <HeroSection />

                <WelcomeSection />
                <AthleteShowcase />
                <NewsSection latestNews={latestNews} />
                <ImpactSection />

                {/* YouTube Channel Strip */}
                <section className="bg-gray-950 border-y border-white/5">
                    <div className="container-custom py-12 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-brand-red rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-red/30">
                                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="white">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="font-heading font-bold text-white text-xl tracking-tight">Landson Foundation on YouTube</p>
                                <p className="font-body text-gray-400 text-sm mt-1">Stories, highlights &amp; events — straight from Nandi County</p>
                            </div>
                        </div>
                        <a
                            href="https://www.youtube.com/@LandsonFoundation"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-7 py-3.5 bg-brand-red hover:bg-red-700 text-white font-black uppercase tracking-widest text-sm rounded-full shadow-xl shadow-brand-red/20 transition-all duration-300 hover:-translate-y-0.5 flex-shrink-0"
                        >
                            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                            Visit Channel
                        </a>
                    </div>
                </section>

                {/* Pillars Section */}
                <section className="bg-gray-100 py-16 md:py-24 overflow-hidden">
                    <div className="container-custom">
                        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                            <h2 className="font-heading font-extrabold text-ink text-4xl md:text-5xl tracking-[-0.02em]">Our Three Pillars</h2>
                            <p className="font-body text-muted text-lg leading-relaxed">The unbreakable foundation of our mission and every life we touch.</p>
                        </div>
                        <TrioCarousel cards={trioCards} />
                    </div>
                </section>
            </main></div>
    )
}

