import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { Icon } from '@/lib/icons'
import Button from '@/components/ui/Button'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// Helper to extract video ID
function getYouTubeId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
}

export const revalidate = 3600

export default async function ProgramDetailPage({ params }: { params: { slug: string } }) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: program, error } = await supabase
        .from('programs')
        .select('*')
        .eq('slug', params.slug)
        .single()

    if (error || !program) {
        notFound()
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-brand-green">
                    <Image
                        src={program.image_url || '/images/programs-hero.jpg'}
                        alt={program.title}
                        fill
                        className="object-cover object-top opacity-50 contrast-[1.1] saturate-[1.1] animate-slow-zoom"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-green/70 via-transparent to-white"></div>
                    
                    <div className="relative z-10 container-custom">
                        <div className="max-w-4xl mx-auto text-center space-y-8">
                            <Link href="/programs" className="inline-flex items-center gap-2 text-white/90 hover:text-white font-bold text-sm uppercase tracking-widest transition-colors mb-4 group drop-shadow-md">
                                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to Programs
                            </Link>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-gray-900 leading-tight tracking-tighter drop-shadow-sm">
                                {program.title}
                            </h1>
                            {program.icon && (
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-2xl text-brand-red">
                                    <Icon name={program.icon} size={40} />
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20 md:py-32 bg-white">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                            {/* Main Content */}
                            <div className="lg:col-span-8 space-y-16">
                                <div className="prose prose-2xl prose-gray max-w-none prose-headings:font-heading prose-headings:font-black prose-p:leading-relaxed prose-p:text-gray-600 prose-strong:text-gray-900">
                                    {program.description.split('\n').map((paragraph: string, idx: number) => (
                                        paragraph.trim() && <p key={idx}>{paragraph}</p>
                                    ))}
                                </div>

                                {program.youtube_url && (
                                    <div className="rounded-[4rem] overflow-hidden shadow-2xl bg-gray-100 border-8 border-white aspect-video">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${getYouTubeId(program.youtube_url)}`}
                                            title="Program Video"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full"
                                        ></iframe>
                                    </div>
                                )}

                                {/* Gallery */}
                                {program.images && program.images.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {program.images.map((img: string, index: number) => (
                                            <div key={index} className="group relative aspect-square rounded-[3rem] overflow-hidden shadow-xl">
                                                <Image
                                                    src={img}
                                                    alt={`${program.title} gallery ${index + 1}`}
                                                    fill
                                                    className="object-cover object-top transition-transform duration-700 group-hover:scale-110 contrast-[1.05]"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Sidebar CTA */}
                            <div className="lg:col-span-4 space-y-8">
                                <div className="sticky top-32 bg-gray-50 p-10 rounded-[3rem] border border-gray-100 space-y-10 shadow-sm relative overflow-hidden text-center lg:text-left">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                    
                                    <div className="relative z-10 space-y-6">
                                        <h3 className="text-2xl font-heading font-black text-gray-900 leading-tight">Support this <br /><span className="text-brand-red uppercase">Initiative</span></h3>
                                        <p className="text-gray-600 font-medium leading-relaxed">
                                            Your partnership helps us sustain and expand this program, reaching more talented youth in Nandi.
                                        </p>
                                        <div className="flex flex-col gap-4">
                                            <Link href="/contact">
                                                <Button fullWidth size="lg">Partner with Us</Button>
                                            </Link>
                                            <Link href="/about">
                                                <Button variant="outline" fullWidth size="lg">How we work</Button>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-gray-200 relative z-10">
                                        <div className="flex items-center justify-center lg:justify-start gap-4 text-gray-400">
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                                                <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040L3 14.535a11.991 11.991 0 001.538 10.925l1.399 2.268A11.957 11.957 0 0012 21.056a11.957 11.957 0 007.063-3.328l1.399-2.268a11.991 11.991 0 001.538-10.925l-.118-1.591z" />
                                                </svg>
                                            </div>
                                            <span className="text-xs font-black uppercase tracking-widest leading-none">Vetted & Secure Program</span>
                                        </div>
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
