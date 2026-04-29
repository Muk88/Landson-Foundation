import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'

// ─── YouTube Configuration ────────────────────────────────────────────────────
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@LandsonFoundation'
const YOUTUBE_FEATURED_VIDEO = 'https://www.youtube.com/embed/YDRpCPtXuFA'
// ──────────────────────────────────────────────────────────────────────────────

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-brand-green">
                    <Image
                        src="/images/nandi-landscape.jpg"
                        alt="Nandi County Landscape"
                        fill
                        className="object-cover opacity-50 contrast-[1.1] saturate-[1.1] animate-slow-zoom"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-green/70 via-brand-green/40 to-brand-green/90"></div>
                    <div className="relative z-10 container-custom text-center space-y-6">
                        <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-xs uppercase tracking-[0.3em] rounded-full drop-shadow-md">
                            Our Mission
                        </span>
                        <h1 className="text-5xl md:text-7xl font-heading font-black text-white leading-tight tracking-tight drop-shadow-2xl">
                            The Landson <span className="text-brand-red">Legacy</span>
                        </h1>
                        <p className="text-xl text-white max-w-2xl mx-auto font-medium drop-shadow-lg">
                            Nurturing talent, providing education, and building a brighter future for Kenya's youth.
                        </p>
                    </div>
                </section>

                {/* Our Story Section */}
                <section id="our-story" className="py-16 md:py-24 bg-white overflow-hidden">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h2 className="text-4xl md:text-5xl font-heading font-black text-gray-900 leading-tight">
                                        Where <span className="text-brand-green">Champions</span> are Born
                                    </h2>
                                    <div className="w-20 h-1.5 bg-brand-red rounded-full"></div>
                                </div>
                                <div className="prose prose-lg text-gray-600 max-w-none space-y-6 font-medium leading-relaxed">
                                    <p>
                                        Located in Nandi County, Kenya - famously known as the "Source of Champions" - the Landson Foundation was established to address a critical challenge facing young athletic talent.
                                    </p>
                                    <p>
                                        While Nandi produces some of the world's most exceptional middle and long-distance runners, many of these young athletes face a difficult choice between pursuing their sporting dreams and completing their education. Poverty and lack of infrastructure often force them to abandon one for the other.
                                    </p>
                                    <p>
                                        We believe that no child should have to sacrifice their education for their talent. Our foundation provides the bridge, ensuring that academic excellence and athletic achievement go hand-in-hand.
                                    </p>
                                </div>
                            </div>
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-brand-red/5 rounded-[3rem] -z-10 group-hover:scale-105 transition-transform duration-500"></div>
                                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-square lg:aspect-[4/5]">
                                    <Image
                                        src="/images/athletes 1.jpg"
                                        alt="Young Athletes"
                                        fill
                                        className="object-cover object-top transition-transform duration-700 group-hover:scale-110 contrast-[1.05]"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── YouTube Feature Section ── */}
                <section className="relative bg-brand-green overflow-hidden">
                    {/* White radial dot pattern — matches ImpactSection */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]"></div>
                    </div>

                    <div className="container-custom relative z-10 py-16 md:py-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                            {/* Left — Text */}
                            <div className="space-y-6">
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-white font-bold text-xs uppercase tracking-widest">
                                    <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                    </svg>
                                    Watch on YouTube
                                </span>
                                <h2 className="text-3xl md:text-4xl font-heading font-black text-white leading-tight tracking-tight">
                                    See the Mission <span className="text-brand-red underline decoration-white/20 underline-offset-8">in Action</span>
                                </h2>
                                <p className="text-white/80 font-medium leading-relaxed text-base max-w-sm">
                                    Go behind the scenes of Landson Foundation — witness the training, the stories, and the lives we are changing in Nandi County.
                                </p>
                                <a
                                    href={YOUTUBE_CHANNEL_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2.5 px-6 py-3 bg-brand-red hover:bg-red-700 text-white font-black uppercase tracking-widest text-xs rounded-full shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                    </svg>
                                    Subscribe to Our Channel
                                </a>
                            </div>

                            {/* Right — Video */}
                            <div className="relative">
                                <div className="absolute -inset-[1px] bg-gradient-to-br from-white/20 via-transparent to-brand-red/40 rounded-2xl"></div>
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                                    <div className="aspect-video bg-black">
                                        <iframe
                                            src={YOUTUBE_FEATURED_VIDEO + '?rel=0&modestbranding=1'}
                                            title="Landson Foundation — Our Story"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                            className="w-full h-full"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>


                {/* Founder's Journey */}
                <section id="founder-journey" className="py-16 md:py-24 bg-gray-50 overflow-hidden">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div className="order-2 lg:order-1 relative">
                                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-square border-8 border-white">
                                    <Image
                                        src="/images/founder.jpg"
                                        alt="Founder Alfred"
                                        fill
                                        className="object-cover object-top contrast-[1.1]"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                <div className="absolute -bottom-10 -right-10 bg-brand-green p-10 rounded-3xl shadow-2xl hidden md:block">
                                    <p className="text-white font-heading font-black text-2xl uppercase tracking-tighter">Founder's Vision</p>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2 space-y-10">
                                <div className="space-y-4">
                                    <span className="text-brand-red font-black text-sm uppercase tracking-widest">The Heart of Landson</span>
                                    <h2 className="text-4xl md:text-5xl font-heading font-black text-gray-900 leading-tight">
                                        Alfred's <span className="text-brand-red">Journey</span>
                                    </h2>
                                </div>
                                <div className="prose prose-lg text-gray-600 max-w-none space-y-6 leading-relaxed italic border-l-4 border-brand-red pl-8">
                                    <p>
                                        "Having grown up in Nandi, I saw firsthand the incredible potential that often went unrealized due to a lack of support. My journey wasn't just about my own success, but about how I could open doors for the next generation of athletes."
                                    </p>
                                    <p className="not-italic font-bold text-gray-900">— Alfred, Founder of Landson Foundation</p>
                                </div>
                                <p className="text-gray-600 text-lg leading-relaxed font-medium">
                                    Alfred's vision was to create more than just a training camp. He wanted a sanctuary of learning and excellence, where the discipline of the track translates into the diligence of the classroom.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section id="core-values" className="py-16 md:py-24 bg-white">
                    <div className="container-custom text-center space-y-20">
                        <div className="max-w-3xl mx-auto space-y-6">
                            <h2 className="text-4xl md:text-5xl font-heading font-black text-gray-900 tracking-tight">Our Core <span className="text-brand-green">Values</span></h2>
                            <p className="text-xl text-gray-600 font-medium leading-relaxed">These principles guide every decision we make and every program we run.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {[
                                { 
                                    title: 'Integrity', 
                                    desc: 'We operate with complete transparency and honesty in all our dealings with athletes, donors, and the community.',
                                    icon: '💎' 
                                },
                                { 
                                    title: 'Excellence', 
                                    desc: 'We strive for the highest standards in both athletic training and educational support, settling for nothing less than the best.',
                                    icon: '⭐' 
                                },
                                { 
                                    title: 'Empowerment', 
                                    desc: 'We don\'t just provide aid; we provide the tools and opportunities for young people to build their own successful futures.',
                                    icon: '🚀' 
                                }
                            ].map((value) => (
                                <div key={value.title} className="group p-12 bg-gray-50 rounded-[3rem] transition-all duration-500 hover:bg-white hover:shadow-2xl hover:-translate-y-4 border border-transparent hover:border-brand-green/10">
                                    <div className="text-6xl mb-8 transform transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12 inline-block">{value.icon}</div>
                                    <h3 className="text-3xl font-heading font-black text-gray-900 mb-6 group-hover:text-brand-green transition-colors">{value.title}</h3>
                                    <p className="text-gray-600 text-lg leading-relaxed font-medium">{value.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-24 bg-brand-red relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:30px_30px]"></div>
                    </div>
                    <div className="container-custom relative z-10 text-center space-y-10">
                        <h2 className="text-4xl md:text-6xl font-heading font-black text-white tracking-tighter">Ready to be part of the story?</h2>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <Link href="/contact">
                                <Button variant="secondary" size="lg" className="bg-white text-brand-red hover:bg-gray-100 min-w-[240px]">Work With Us</Button>
                            </Link>
                            <Link href="/programs">
                                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-red min-w-[240px]">Explore Programs</Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
