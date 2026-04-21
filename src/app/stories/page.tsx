import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Icon } from '@/lib/icons'

// Enable ISR
export const revalidate = 3600

async function getStories() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: stories, error } = await supabase
        .from('success_stories')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching stories:', error)
        return []
    }

    return stories.map((item: any) => ({
        id: item.id,
        name: item.name || item.athlete_name,
        achievement: item.title || item.achievement,
        story: item.story || item.story_content,
        image: item.image_url,
        year: item.year || new Date(item.created_at).getFullYear(),
        university: item.achievement
    }))
}

export default async function StoriesPage() {
    const stories = await getStories()

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-brand-green">
                    <Image
                        src="/images/stories-hero.jpg"
                        alt="Success Stories"
                        fill
                        className="object-cover opacity-50 contrast-[1.1] saturate-[1.1] animate-slow-zoom"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-green/70 via-brand-green/40 to-brand-green/90"></div>
                    <div className="relative z-10 container-custom text-center space-y-6 text-white">
                        <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-xs uppercase tracking-[0.3em] rounded-full drop-shadow-md">
                            Life Transformations
                        </span>
                        <h1 className="text-5xl md:text-7xl font-heading font-black text-white leading-tight tracking-tight drop-shadow-2xl">
                            Success <span className="text-brand-red">Stories</span>
                        </h1>
                        <p className="text-xl text-white max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-lg">
                            Inspiring journeys of resilience, dedication, and the power of opportunity.
                        </p>
                    </div>
                </section>

                {/* Stories Grid */}
                <section className="py-16 md:py-24 bg-white relative">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                            {stories.map((story: any, index: number) => (
                                <Link 
                                    href={`/stories/${story.id}`} 
                                    key={story.id} 
                                    className="group flex flex-col animate-fade-in-up" 
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-xl mb-8 group-hover:-translate-y-4 group-hover:shadow-2xl transition-all duration-500">
                                        <Image
                                            src={story.image}
                                            alt={story.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-brand-green/80 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                                        
                                        <div className="absolute top-8 right-8">
                                            <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full font-bold text-xs">
                                                Class of {story.year}
                                            </div>
                                        </div>

                                        <div className="absolute bottom-8 left-8 right-8">
                                            <h3 className="text-3xl font-heading font-black text-white leading-tight mb-2 uppercase tracking-tighter">
                                                {story.name}
                                            </h3>
                                            <span className="inline-block px-3 py-1 bg-brand-red text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                                                {story.university}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4 px-2">
                                        <h4 className="text-xl font-heading font-black text-gray-900 group-hover:text-brand-red transition-colors line-clamp-1">
                                            {story.achievement}
                                        </h4>
                                        <p className="text-gray-600 leading-relaxed font-medium line-clamp-3">
                                            {story.story}
                                        </p>
                                        <div className="pt-4 flex items-center gap-3 text-brand-green font-bold text-sm uppercase tracking-widest group-hover:gap-5 transition-all">
                                            Read Full Journey
                                            <svg className="w-6 h-6 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {stories.length === 0 && (
                            <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                                <p className="text-gray-500 font-medium text-lg italic">No success stories found. Inspiring journeys are in the making.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Final Story CTA */}
                <section className="py-24 bg-gray-50">
                    <div className="container-custom text-center space-y-10">
                        <h2 className="text-4xl md:text-6xl font-heading font-black text-gray-900 leading-none tracking-tighter max-w-4xl mx-auto">Help us create more stories like these.</h2>
                        <Link href="/contact" className="inline-block">
                            <button className="px-12 py-6 bg-brand-red text-white font-heading font-black text-xl uppercase tracking-widest rounded-full shadow-2xl shadow-brand-red/30 hover:bg-brand-red-dark hover:-translate-y-2 transition-all duration-300">
                                Get Involved
                            </button>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
