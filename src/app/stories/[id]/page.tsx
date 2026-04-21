import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { createClient } from '@supabase/supabase-js'
import { Icon } from '@/lib/icons'

// Helper to extract video ID
function getYouTubeId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
}

export const revalidate = 3600

export default async function StoryDetailPage({ params }: { params: { id: string } }) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: story, error } = await supabase
        .from('success_stories')
        .select('*')
        .eq('id', params.id)
        .single()

    if (error || !story) {
        notFound()
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-brand-green">
                    <Image
                        src={story.image_url}
                        alt={story.name || story.athlete_name}
                        fill
                        className="object-cover opacity-50"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-green/40 via-transparent to-brand-green/90"></div>
                    
                    <div className="relative z-10 container-custom">
                        <div className="max-w-4xl space-y-8">
                            <Link href="/stories" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-bold text-sm uppercase tracking-widest transition-colors group mb-4">
                                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Success Stories
                            </Link>
                            <div className="space-y-4">
                                <span className="inline-block px-4 py-2 bg-brand-red text-white font-black text-xs uppercase tracking-[0.2em] rounded-lg shadow-xl">
                                    Class of {story.year || new Date(story.created_at).getFullYear()}
                                </span>
                                <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-black text-white leading-[0.85] tracking-tighter drop-shadow-2xl">
                                    {story.name || story.athlete_name}
                                </h1>
                            </div>
                            <p className="text-2xl md:text-3xl text-white/90 font-heading font-extrabold max-w-2xl leading-tight border-l-8 border-brand-red pl-8">
                                {story.title || story.achievement}
                            </p>
                        </div>
                    </div>

                    <div className="absolute bottom-12 right-12 z-20 hidden md:block">
                        <div className="w-32 h-32 rounded-full border-2 border-white/20 flex items-center justify-center animate-spin-slow">
                            <div className="text-white/40 font-black text-[10px] uppercase tracking-[0.3em]">Story of Resilience • </div>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-24 md:py-32 bg-white">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                            {/* Left Sidebar Info */}
                            <div className="lg:col-span-4 space-y-12 order-2 lg:order-1">
                                <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 space-y-8 shadow-sm">
                                    <h3 className="text-xl font-heading font-black text-gray-900 uppercase tracking-tighter">At a Glance</h3>
                                    <div className="space-y-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Athlete</span>
                                            <span className="text-lg font-bold text-gray-900">{story.name || story.athlete_name}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Achievement</span>
                                            <span className="text-lg font-bold text-gray-900">{story.achievement || 'Professional Athlete'}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Year</span>
                                            <span className="text-lg font-bold text-gray-900">{story.year || '2024'}</span>
                                        </div>
                                    </div>
                                    <div className="pt-6 border-t border-gray-200">
                                        <Link href="/contact">
                                            <button className="w-full py-4 bg-brand-green text-white font-bold uppercase text-xs tracking-widest rounded-2xl hover:bg-brand-green-dark transition-colors">Support Like This</button>
                                        </Link>
                                    </div>
                                </div>

                                <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl">
                                    <Image 
                                        src={story.image_url} 
                                        alt="Profile" 
                                        fill 
                                        className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                            </div>

                            {/* Main Story Content */}
                            <div className="lg:col-span-8 space-y-12 order-1 lg:order-2">
                                <div className="prose prose-2xl prose-gray max-w-none prose-headings:font-heading prose-headings:font-black prose-p:leading-relaxed prose-p:text-gray-600 prose-strong:text-gray-900">
                                    {story.story || story.story_content ? (
                                        (story.story || story.story_content).split('\n').map((paragraph: string, idx: number) => (
                                            paragraph.trim() && <p key={idx} className="mb-8">{paragraph}</p>
                                        ))
                                    ) : (
                                        <p>Story content is currently being finalized. Check back soon for the full inspiring journey.</p>
                                    )}
                                </div>

                                {/* YouTube Integration */}
                                {story.youtube_url && (
                                    <div className="rounded-[4rem] overflow-hidden shadow-2xl bg-gray-950 p-4 lg:p-8 aspect-video relative group">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${getYouTubeId(story.youtube_url)}?autoplay=0&rel=0`}
                                            title="Athlete Journey Video"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full rounded-[2.5rem]"
                                        ></iframe>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Next Stories Section */}
                <section className="py-24 bg-gray-50">
                    <div className="container-custom text-center space-y-12">
                        <h2 className="text-4xl md:text-5xl font-heading font-black text-gray-900 tracking-tight">More Lives <span className="text-brand-red">Transformed</span></h2>
                        <Link href="/stories" className="inline-block">
                            <button className="px-10 py-4 border-2 border-gray-200 text-gray-900 font-black uppercase text-sm tracking-widest rounded-full hover:border-brand-red hover:text-brand-red hover:bg-brand-red-soft transition-all duration-300">
                                View All Success Stories
                            </button>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
