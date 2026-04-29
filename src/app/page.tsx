import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { createClient } from '@supabase/supabase-js'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import AthleteShowcase from '@/components/AthleteShowcase'
import NewsSection from '@/components/home/NewsSection'

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

export const revalidate = 3600

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
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden bg-brand-green">
                    <video
                        className="absolute inset-0 w-full h-full object-cover opacity-50 contrast-[1.1] saturate-[1.1]"
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster="/images/home.jpg"
                    >
                        <source src="/videos/hero.mp4" type="video/mp4" />
                    </video>
                    
                    {/* Premium Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-green/70 via-brand-green/20 to-brand-green/90 z-10"></div>
                    
                    {/* Floating Hero Athlete */}
                    <div className="absolute bottom-0 right-0 z-20 pointer-events-none hidden lg:flex items-end h-[95vh] pr-8 xl:pr-16">
                        <Image
                            src="/images/kipchoge-cutout.png"
                            alt="Kenyan Champion Athlete"
                            width={480}
                            height={720}
                            className="object-contain object-bottom drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)] animate-fade-in-up [animation-delay:800ms] transition-transform duration-[8s] hover:scale-105"
                            priority
                        />
                    </div>

                    <div className="relative z-30 container-custom text-center lg:text-left">
                        <div className="max-w-3xl space-y-10">
                            <div className="space-y-4">
                                <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-black text-white leading-[0.9] tracking-tighter drop-shadow-2xl animate-fade-in-up [animation-delay:200ms]">
                                    Talent <br />
                                    <span className="text-brand-red">for</span> <br />
                                    Education.
                                </h1>
                            </div>
                            
                            <p className="text-xl md:text-2xl text-white font-medium max-w-xl animate-fade-in-up [animation-delay:400ms] leading-relaxed drop-shadow-lg">
                                Empowering Kenya's elite youth athletes through comprehensive scholarships, world-class training, and lifelong mentorship.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up [animation-delay:600ms]">
                                <Link href="/programs">
                                    <Button variant="primary" size="lg" className="min-w-[220px] py-5 text-lg shadow-2xl shadow-brand-red/40">
                                        Our Programs
                                    </Button>
                                </Link>
                                <Link href="/about">
                                    <Button variant="outline" size="lg" className="min-w-[220px] py-5 text-lg border-white text-white hover:bg-white hover:text-brand-green">
                                        Our Story
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
                        <span className="text-white/40 font-bold text-[10px] uppercase tracking-[0.4em]">Scroll</span>
                        <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent"></div>
                    </div>
                </section>

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
                                <p className="text-white font-heading font-black text-xl tracking-tight">Landson Foundation on YouTube</p>
                                <p className="text-gray-400 font-medium text-sm mt-0.5">Stories, highlights &amp; events — straight from Nandi County</p>
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
                            <h2 className="text-4xl md:text-5xl font-heading font-black text-gray-900 tracking-tight">Our Three Pillars</h2>
                            <p className="text-lg text-gray-600 font-medium">The unbreakable foundation of our mission and every life we touch.</p>
                        </div>
                        <TrioCarousel cards={trioCards} />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
