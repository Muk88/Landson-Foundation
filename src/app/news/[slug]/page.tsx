import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { Icon } from '@/lib/icons'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// Helper to extract video ID
function getYouTubeId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
}

export const revalidate = 3600

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: newsItem, error } = await supabase
        .from('news')
        .select('*')
        .eq('slug', params.slug)
        .single()

    if (error || !newsItem) {
        notFound()
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-brand-green">
                    <Image
                        src={newsItem.image_url || '/images/background2.jpg'}
                        alt={newsItem.title}
                        fill
                        className="object-cover object-top opacity-50 contrast-[1.1] saturate-[1.1]"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-green/70 via-transparent to-white"></div>
                    
                    <div className="relative z-10 container-custom">
                        <div className="max-w-4xl mx-auto text-center space-y-8">
                            <Link href="/news" className="inline-flex items-center gap-2 text-white/90 hover:text-white font-bold text-sm uppercase tracking-widest transition-colors mb-4 group drop-shadow-md">
                                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to News
                            </Link>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-gray-900 leading-tight tracking-tighter drop-shadow-sm">
                                {newsItem.title}
                            </h1>
                            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 font-bold uppercase text-xs tracking-[0.2em]">
                                <span className="px-4 py-2 bg-brand-red text-white rounded-lg shadow-lg">{newsItem.category}</span>
                                <span>{new Date(newsItem.published_date).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20 md:py-32 bg-white">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto">
                            {/* Article Body */}
                            <div className="prose prose-xl prose-gray max-w-none prose-headings:font-heading prose-headings:font-black prose-p:leading-relaxed prose-p:text-gray-600 prose-strong:text-gray-900 prose-img:rounded-[3rem] prose-img:shadow-2xl">
                                {newsItem.content.split('\n').map((paragraph: string, idx: number) => (
                                    paragraph.trim() && <p key={idx}>{paragraph}</p>
                                ))}
                            </div>

                            {/* YouTube Section */}
                            {newsItem.youtube_url && (
                                <div className="mt-20 rounded-[3rem] overflow-hidden shadow-2xl bg-gray-100 border-8 border-white aspect-video">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${getYouTubeId(newsItem.youtube_url)}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    ></iframe>
                                </div>
                            )}

                            {/* Gallery */}
                            {newsItem.images && newsItem.images.length > 0 && (
                                <div className="mt-24 space-y-12">
                                    <h2 className="text-3xl font-heading font-black text-gray-900 uppercase tracking-tighter">Event Gallery</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {newsItem.images.map((img: string, index: number) => (
                                            <div key={index} className="group relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-xl">
                                                <Image
                                                    src={img}
                                                    alt={`${newsItem.title} gallery ${index + 1}`}
                                                    fill
                                                    className="object-cover object-top transition-transform duration-700 group-hover:scale-110 contrast-[1.05]"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                                <div className="absolute inset-0 bg-brand-green/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Bottom Navigation */}
                            <div className="mt-32 pt-12 border-t border-gray-100 flex justify-between items-center">
                                <Link href="/news" className="text-brand-green font-black uppercase tracking-widest text-sm hover:text-brand-red transition-colors flex items-center gap-3 group">
                                    <svg className="w-6 h-6 transition-transform group-hover:-translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    All Updates
                                </Link>
                                <div className="flex gap-4">
                                    {/* Social Share Buttons Placeholder */}
                                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-brand-red hover:text-white transition-all cursor-pointer">
                                        <div className="w-5 h-5 bg-current opacity-70"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
