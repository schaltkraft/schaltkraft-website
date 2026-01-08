
import { getJob, getAllJobs } from '@/lib/cms-server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PageContainer } from '@/components/layout/PageContainer';
import Link from 'next/link';

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

    // JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: job.title,
        description: job.description, // Requires HTML cleanup usually, but raw html is okay-ish for simple check
        datePosted: job.datePosted,
        employmentType: job.employmentType === 'Vollzeit' ? 'FULL_TIME' : 'PART_TIME',
        hiringOrganization: {
            '@type': 'Organization',
            name: 'Schaltkraft AG',
            sameAs: 'https://schaltkraft.ch',
            logo: 'https://schaltkraft.ch/images/global/logo.svg'
        },
        jobLocation: {
            '@type': 'Place',
            address: {
                '@type': 'PostalAddress',
                addressLocality: job.location,
                addressCountry: 'CH'
            }
        }
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
                            href="mailto:jobs@schaltkraft.ch"
                            className="inline-flex items-center justify-center px-8 py-4 bg-brand-orange text-white font-bold rounded-full hover:bg-white hover:text-brand-orange transition-all duration-300 transform hover:scale-105"
                        >
                            Jetzt bewerben
                        </a>
                    </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        <div
                            className="prose prose-invert prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-p:text-zinc-300 prose-li:text-zinc-300 prose-strong:text-white prose-a:text-brand-orange"
                            dangerouslySetInnerHTML={{ __html: job.description }}
                        />

                        <div className="mt-16 pt-16 border-t border-white/10">
                            <h3 className="text-2xl font-bold mb-6">Interessiert?</h3>
                            <p className="text-xl text-zinc-400 mb-8">
                                Wir freuen uns auf deine Bewerbung (CV genügt) per E-Mail.
                            </p>
                            <a
                                href="mailto:jobs@schaltkraft.ch"
                                className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-brand-orange hover:text-white transition-all duration-300"
                            >
                                Jetzt bewerben
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-8">
                        {/* Sidebar Widget: About Company or Contact */}
                        <div className="bg-zinc-900 rounded-2xl p-8 border border-white/10 sticky top-32">
                            <h3 className="text-xl font-bold mb-4">Über Schaltkraft</h3>
                            <p className="text-zinc-400 mb-6 text-sm">
                                Wir sind Spezialisten im Schaltanlagenbau und realisieren anspruchsvolle Projekte mit höchster Präzision.
                            </p>
                            <Link href="/about-us" className="text-brand-orange hover:text-white text-sm font-semibold">
                                Mehr über uns &rarr;
                            </Link>
                        </div>
                    </div>
                </div>

            </PageContainer>
        </main>
    );
}
