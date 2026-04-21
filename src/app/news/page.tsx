import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Icon } from '@/lib/icons'

// Enable ISR
export const revalidate = 3600

async function getNews() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: news, error } = await supabase
        .from('news')
        .select('*')
        .eq('is_published', true)
        .order('published_date', { ascending: false })

    if (error) {
        console.error('Error fetching news:', error)
        return []
    }

    return news.map((item: any) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        date: new Date(item.published_date).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
            day: 'numeric'
        }),
        category: item.category,
        image: item.image_url,
        excerpt: item.excerpt
    }))
}

export default async function NewsPage() {
    const newsItems = await getNews()

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-brand-green">
                    <Image
                        src="/images/background2.jpg"
                        alt="News & Updates"
                        fill
                        className="object-cover opacity-50 contrast-[1.1] saturate-[1.1] animate-slow-zoom"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-green/70 via-brand-green/40 to-brand-green/90"></div>
                    <div className="relative z-10 container-custom text-center space-y-6 text-white">
                        <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-xs uppercase tracking-[0.3em] rounded-full drop-shadow-md">
                            The Ticker
                        </span>
                        <h1 className="text-5xl md:text-7xl font-heading font-black text-white leading-tight tracking-tight drop-shadow-2xl">
                            News & <span className="text-brand-red">Updates</span>
                        </h1>
                        <p className="text-xl text-white max-w-2xl mx-auto font-medium drop-shadow-lg">
                            The latest achievements, events, and announcements from the field.
                        </p>
                    </div>
                </section>

                {/* News Grid */}
                <section className="py-16 md:py-24 bg-white relative">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                            {newsItems.map((item: any, index: number) => (
                                <Link
                                    key={item.id}
                                    href={`/news/${item.slug || item.id}`}
                                    className="group flex flex-col space-y-8 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110 contrast-[1.05]"
                                        />
                                        <div className="absolute top-6 left-6">
                                            <span className="px-4 py-2 bg-brand-red text-white font-black text-[10px] uppercase tracking-widest rounded-lg shadow-lg">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4 px-2">
                                        <span className="text-brand-green font-black text-xs uppercase tracking-widest">{item.date}</span>
                                        <h2 className="text-2xl md:text-3xl font-heading font-black text-gray-900 group-hover:text-brand-red transition-colors leading-tight line-clamp-2">
                                            {item.title}
                                        </h2>
                                        <p className="text-gray-600 text-lg leading-relaxed line-clamp-3 font-medium">
                                            {item.excerpt}
                                        </p>
                                        <div className="pt-2 flex items-center gap-2 text-brand-green font-black text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                                            Read Full Story
                                            <svg className="w-6 h-6 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        
                        {newsItems.length === 0 && (
                            <div className="text-center py-24 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                                <p className="text-gray-500 font-bold text-xl italic tracking-tight">Stay tuned for upcoming news and updates.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
