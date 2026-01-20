
import { getJob, getAllJobs } from '@/lib/cms-server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PageContainer } from '@/components/layout/PageContainer';
import Link from 'next/link';
import { JobContent } from '@/components/jobs/JobContent';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const job = await getJob(slug);

    if (!job) {
        return {
            title: 'Job nicht gefunden',
        };
    }

    return {
        title: `${job.seoTitle || job.title} | Schaltkraft AG`,
        description: job.seoDescription || `Bewerben Sie sich jetzt als ${job.title} bei Schaltkraft AG.`,
    };
}

export async function generateStaticParams() {
    const jobs = await getAllJobs();
    return jobs.map((job) => ({
        slug: job.slug,
    }));
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const job = await getJob(slug);

    if (!job) {
        return notFound();
    }

    // JSON-LD Structured Data for Google Jobs
    const jobDescription = job.description?.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() || '';
    const validThrough = new Date(new Date(job.datePosted).setMonth(new Date(job.datePosted).getMonth() + 3)).toISOString().split('T')[0];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: job.title,
        description: jobDescription,
        datePosted: job.datePosted,
        validThrough: validThrough,
        employmentType: job.employmentType === 'Vollzeit' ? 'FULL_TIME' : 'PART_TIME',
        directApply: true,
        hiringOrganization: {
            '@type': 'Organization',
            name: 'Schaltkraft AG',
            sameAs: 'https://schaltkraft.ch',
            logo: 'https://schaltkraft.ch/images/global/logo.svg',
            url: 'https://schaltkraft.ch'
        },
        jobLocation: {
            '@type': 'Place',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'Mühlegartenstrasse 5',
                addressLocality: job.location,
                postalCode: '8590',
                addressRegion: 'Thurgau',
                addressCountry: 'CH'
            }
        },
        baseSalary: {
            '@type': 'MonetaryAmount',
            currency: 'CHF',
            value: {
                '@type': 'QuantitativeValue',
                minValue: 60000,
                maxValue: 85000,
                unitText: 'YEAR'
            }
        },
        applicantLocationRequirements: {
            '@type': 'Country',
            name: 'Schweiz'
        },
        jobLocationType: 'ONSITE'
    };

    return (
        <main className="bg-black min-h-screen pt-32 pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <PageContainer>
                {/* Back Link */}
                <Link href="/jobs" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Zurück zur Übersicht
                </Link>

                {/* Hero / Header */}
                <div className="bg-zinc-900 rounded-3xl p-8 md:p-12 border border-white/10 mb-12">
                    <div className="max-w-4xl">
                        <div className="flex flex-wrap gap-4 mb-6">
                            <span className="bg-brand-orange/10 text-brand-orange px-4 py-1.5 rounded-full text-sm font-semibold border border-brand-orange/20">
                                {job.employmentType}
                            </span>
                            <span className="bg-zinc-800 text-zinc-300 px-4 py-1.5 rounded-full text-sm flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {job.location}
                            </span>
                            <span className="text-zinc-500 text-sm flex items-center">
                                Posted: {new Date(job.datePosted).toLocaleDateString('de-CH')}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold font-heading mb-8 text-white">
                            {job.title}
                        </h1>

                        <a
                            href="mailto:info@schaltkraft.ch"
                            className="inline-flex items-center justify-center px-8 py-4 bg-brand-orange text-white font-bold rounded-full hover:bg-white hover:text-brand-orange transition-all duration-300 transform hover:scale-105"
                        >
                            Jetzt bewerben
                        </a>
                    </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        {/* Custom styled job content with icons */}
                        <JobContent
                            sections={job.sections}
                            description={job.description}
                        />
                    </div>

                    <div className="lg:col-span-4">
                        {/* Sticky Sidebar with CTA and Company Info */}
                        <div className="bg-zinc-900 rounded-2xl p-8 border border-white/10 sticky top-32 space-y-8">
                            {/* CTA Section */}
                            <div>
                                <h3 className="text-2xl font-bold mb-4 text-brand-orange">Interessiert?</h3>
                                <p className="text-zinc-400 mb-6 text-sm">
                                    Wir freuen uns auf Ihre vollständigen Bewerbungsunterlagen per E-Mail.
                                </p>
                                <a
                                    href="mailto:info@schaltkraft.ch"
                                    className="w-full inline-flex items-center justify-center px-6 py-4 bg-brand-orange text-white font-bold rounded-full hover:bg-white hover:text-brand-orange transition-all duration-300 transform hover:scale-105"
                                >
                                    Jetzt bewerben
                                </a>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-white/10"></div>

                            {/* Company Info */}
                            <div>
                                <h3 className="text-lg font-bold mb-3">Über Schaltkraft</h3>
                                <p className="text-zinc-400 mb-4 text-sm">
                                    Wir sind Spezialisten im Schaltanlagenbau und realisieren anspruchsvolle Projekte mit höchster Präzision.
                                </p>
                                <Link href="/about-us" className="text-brand-orange hover:text-white text-sm font-semibold transition-colors">
                                    Mehr über uns &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </PageContainer>
        </main>
    );
}
