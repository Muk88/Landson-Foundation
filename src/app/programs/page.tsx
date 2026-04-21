import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import { Icon } from '@/lib/icons'

// Enable ISR
export const revalidate = 3600

async function getPrograms() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: programs, error } = await supabase
        .from('programs')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true })

    if (error) {
        console.error('Error fetching programs:', error)
        return []
    }

    return programs.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.image_url,
        slug: item.slug,
        icon_name: item.icon_name || item.icon
    }))
}

export default async function ProgramsPage() {
    const programs = await getPrograms()

    const timelineSteps = [
        {
            title: 'Scouting & Identification',
            description:
                'We identify talented young athletes in Nandi through school competitions, community events, and recommendations from coaches and teachers.',
        },
        {
            title: 'Assessment & Selection',
            description:
                'Selected athletes undergo evaluation of both athletic potential and academic performance to ensure they can benefit from our comprehensive support.',
        },
        {
            title: 'Training & Education',
            description:
                'Athletes receive scholarships for their education while participating in structured training programs and mentorship sessions.',
        },
        {
            title: 'University & Professional Career',
            description:
                'We support athletes through university education and help them transition to professional athletic careers or other fields of their choice.',
        },
    ]

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-brand-green">
                    <Image
                        src="/images/programs-hero.jpg"
                        alt="Our Programs"
                        fill
                        className="object-cover opacity-50 contrast-[1.1] saturate-[1.1] animate-slow-zoom"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-green/70 via-brand-green/40 to-brand-green/90"></div>
                    
                    {/* Floating athlete decoration */}
                    <div className="absolute bottom-0 right-0 z-20 pointer-events-none hidden lg:block h-[80%] opacity-70 grayscale hover:grayscale-0 transition-all duration-1000 translate-x-20">
                        <Image
                            src="/images/athletes_1.png"
                            alt="Landson Athlete"
                            width={500}
                            height={700}
                            className="object-contain object-bottom contrast-[1.1]"
                        />
                    </div>

                    <div className="relative z-30 container-custom text-center space-y-6">
                        <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-xs uppercase tracking-[0.3em] rounded-full drop-shadow-md">
                            Our Impact
                        </span>
                        <h1 className="text-5xl md:text-7xl font-heading font-black text-white leading-tight tracking-tight drop-shadow-2xl">
                            Excellence <span className="text-brand-red">Programs</span>
                        </h1>
                        <p className="text-xl text-white max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-lg">
                            A holistic approach to nurturing talent, ensuring every athlete reaches their full potential on the track and in the classroom.
                        </p>
                    </div>
                </section>

                {/* Programs Grid */}
                <section className="py-16 md:py-24 bg-white relative">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                            {programs.map((program: any, index: number) => (
                                <div key={program.id} className="group flex flex-col space-y-8 animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                                    <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-xl transition-transform duration-500 group-hover:-translate-y-4 group-hover:shadow-2xl">
                                        <Image
                                            src={program.image}
                                            alt={program.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110 contrast-[1.05]"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-brand-green/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                                        
                                        {program.icon_name && (
                                            <div className="absolute top-8 left-8 w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-red shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
                                                <Icon name={program.icon_name} size={32} />
                                            </div>
                                        )}

                                        <div className="absolute bottom-8 left-8 right-8">
                                            <h3 className="text-3xl font-heading font-black text-white leading-tight mb-2">{program.title}</h3>
                                            <div className="w-12 h-1 bg-brand-red rounded-full transform origin-left transition-all duration-500 group-hover:w-full"></div>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <p className="text-gray-600 text-lg leading-relaxed line-clamp-3 font-medium">
                                            {program.description}
                                        </p>
                                        <Link 
                                            href={`/programs/${program.slug || '#'}`}
                                            className="inline-flex items-center gap-3 text-brand-green font-bold text-sm uppercase tracking-widest hover:gap-5 transition-all group/link"
                                        >
                                            {program.slug ? 'Explore Program' : 'Coming Soon'}
                                            {program.slug && (
                                                <svg className="w-6 h-6 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            )}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Timeline Section */}
                <section className="py-16 md:py-24 bg-gray-950 text-white overflow-hidden relative">
                    <div className="absolute inset-0 opacity-20 grayscale pointer-events-none">
                        <Image src="/images/runner2.jpg" alt="Runner" fill className="object-cover" sizes="100vw" />
                    </div>
                    <div className="absolute inset-0 bg-brand-green/80 backdrop-blur-[2px]"></div>
                    
                    <div className="container-custom relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
                            <span className="text-brand-red font-black text-sm uppercase tracking-[0.4em]">Development Model</span>
                            <h2 className="text-4xl md:text-6xl font-heading font-black text-white leading-tight">The Journey to <span className="underline decoration-brand-red decoration-8 underline-offset-[12px]">Success</span></h2>
                        </div>

                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20 hidden lg:block"></div>
                            
                            <div className="space-y-12 lg:space-y-0">
                                {timelineSteps.map((step, index) => (
                                    <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-0 ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
                                        <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-20 lg:text-right' : 'lg:pl-20'}`}>
                                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-colors duration-500 shadow-2xl">
                                                <span className="text-brand-red font-black text-5xl opacity-30 mb-4 block leading-none">{String(index + 1).padStart(2, '0')}</span>
                                                <h4 className="text-2xl font-heading font-black text-white mb-4 uppercase tracking-tighter">{step.title}</h4>
                                                <p className="text-white/70 text-lg font-medium leading-relaxed">{step.description}</p>
                                            </div>
                                        </div>
                                        <div className="relative z-20 flex items-center justify-center w-12 h-12 rounded-full bg-brand-red shadow-[0_0_30px_rgba(227,30,36,0.5)] border-4 border-gray-950">
                                            <div className="w-2 h-2 rounded-full bg-white animate-ping"></div>
                                        </div>
                                        <div className="lg:w-1/2"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ/Partner CTA */}
                <section className="py-24 bg-gray-50">
                    <div className="container-custom">
                        <div className="bg-white rounded-[4rem] p-12 md:p-24 shadow-2xl flex flex-col lg:flex-row items-center gap-16 border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                            <div className="flex-1 space-y-8 relative z-10 text-center lg:text-left">
                                <h2 className="text-4xl md:text-5xl font-heading font-black text-gray-900 leading-tight">Partner with our <span className="text-brand-green">mission</span></h2>
                                <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-xl">
                                    We are always looking for organizations and individuals who share our vision for youth empowerment through sports and education.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-6 pt-4 justify-center lg:justify-start">
                                    <Link href="/contact">
                                        <Button variant="primary" size="lg" className="min-w-[220px]">Get in Touch</Button>
                                    </Link>
                                    <Link href="/about">
                                        <Button variant="outline" size="lg" className="min-w-[220px]">Learn More</Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex-1 w-full relative">
                                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[16/10]">
                                    <Image src="/images/mentorship.jpg" alt="Partner" fill className="object-cover" />
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
