import * as React from 'react';
import Image from 'next/image';

interface JobPerksGalleryProps {
    data: {
        headline?: string;
        images: {
            image: string;
            alt: string;
        }[];
        perks: {
            title: string;
            subtitle: string;
        }[];
    }
}

export function JobPerksGalleryBlock({ data }: JobPerksGalleryProps) {
    if (!data.images || data.images.length !== 3 || !data.perks || data.perks.length !== 2) {
        return null;
    }

    return (
        <section className="py-16 lg:py-24 bg-zinc-950 text-white overflow-hidden">
            <div className="container-page">
                {data.headline && (
                    <div className="mb-12 text-center md:text-left">
                        <h2 className="text-3xl lg:text-5xl font-bold font-heading uppercase text-white">
                            {data.headline}
                        </h2>
                        <div className="w-24 h-1 bg-brand-orange mt-6 mx-auto md:mx-0"></div>
                    </div>
                )}

                <div className="relative mt-8 lg:mt-16">
                    {/* Floating Perks Content - Desktop */}
                    <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-4xl justify-between px-8 pointer-events-none">
                        {data.perks.map((perk, index) => (
                            <div
                                key={index}
                                className={`
                                    bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 
                                    shadow-2xl shadow-black/50 pointer-events-auto transform transition-transform hover:scale-105
                                    ${index === 0 ? '-translate-y-12' : 'translate-y-12'}
                                `}
                            >
                                <div className="text-5xl xl:text-7xl font-bold font-heading text-brand-orange mb-2">
                                    {perk.title}
                                </div>
                                <div className="text-xl xl:text-2xl text-white font-medium">
                                    {perk.subtitle}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Image Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 h-auto lg:h-[600px] xl:h-[700px]">
                        {/* Large Image Left */}
                        <div className="lg:col-span-7 relative h-[400px] lg:h-full rounded-3xl overflow-hidden group">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                            <Image
                                src={data.images[0].image}
                                alt={data.images[0].alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 60vw"
                            />
                        </div>

                        {/* Two Smaller Images Right */}
                        <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8 justify-between">
                            <div className="relative h-[300px] lg:h-[calc(50%-1rem)] rounded-3xl overflow-hidden group">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                <Image
                                    src={data.images[1].image}
                                    alt={data.images[1].alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 1024px) 100vw, 40vw"
                                />
                            </div>
                            <div className="relative h-[300px] lg:h-[calc(50%-1rem)] rounded-3xl overflow-hidden group">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                <Image
                                    src={data.images[2].image}
                                    alt={data.images[2].alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 1024px) 100vw, 40vw"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Perks Content - Below Images */}
                    <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                        {data.perks.map((perk, index) => (
                            <div
                                key={index}
                                className="bg-zinc-900 border border-white/10 rounded-2xl p-6 text-center shadow-lg"
                            >
                                <div className="text-4xl font-bold font-heading text-brand-orange mb-2">
                                    {perk.title}
                                </div>
                                <div className="text-lg text-white font-medium">
                                    {perk.subtitle}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
