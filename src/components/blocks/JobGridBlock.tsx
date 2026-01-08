
import Link from 'next/link';
import { getAllJobs } from '@/lib/cms-server';

// This is a Server Component
export async function JobGridBlock({ data }: { data: any }) {
    const jobs = await getAllJobs();
    const { headline, intro } = data || {};

    return (
        <section className="py-20 bg-zinc-950 text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    {headline && (
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading">
                            {headline}
                        </h2>
                    )}
                    {intro && (
                        <p className="text-lg text-zinc-400">
                            {intro}
                        </p>
                    )}
                </div>

                {jobs.length === 0 ? (
                    <div className="text-center py-12 bg-zinc-900/50 rounded-2xl border border-white/5">
                        <p className="text-xl text-zinc-500">
                            Aktuell sind keine offenen Stellen ausgeschrieben.
                        </p>
                        <p className="mt-2 text-zinc-600">
                            Initiativbewerbungen sind jederzeit willkommen.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {jobs.map((job) => (
                            <Link
                                key={job.slug}
                                href={`/jobs/${job.slug}`}
                                className="group block p-8 rounded-2xl bg-zinc-900 border border-white/10 hover:border-brand-orange transition-colors duration-300"
                            >
                                <div className="flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-bold group-hover:text-brand-orange transition-colors">
                                            {job.title}
                                        </h3>
                                        <div className="bg-zinc-800 text-xs px-3 py-1 rounded-full text-zinc-300">
                                            {job.employmentType}
                                        </div>
                                    </div>

                                    <div className="mb-8 flex-grow">
                                        <div className="flex items-center text-zinc-400 text-sm mb-2">
                                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {job.location}
                                        </div>
                                    </div>

                                    <div className="flex items-center text-brand-orange font-medium">
                                        Mehr erfahren
                                        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
