'use client';

import { useState } from 'react';

export function ProjectList({ initialProjects, categories }: { initialProjects: any[], categories: any[] }) {
    const [filter, setFilter] = useState<string | null>(null);

    const filteredProjects = filter
        ? initialProjects.filter((p) => p.category === filter)
        : initialProjects;

    return (
        <div>
            {/* Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
                <button
                    onClick={() => setFilter(null)}
                    className={`px-6 py-2 rounded-lg font-semibold transition-colors ${filter === null
                            ? 'bg-brand-red text-white'
                            : 'bg-muted text-foreground hover:bg-neutral-200'
                        }`}
                >
                    Alle
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.value}
                        onClick={() => setFilter(cat.value)}
                        className={`px-6 py-2 rounded-lg font-semibold transition-colors ${filter === cat.value
                                ? 'bg-brand-red text-white'
                                : 'bg-muted text-foreground hover:bg-neutral-200'
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-3 gap-8">
                {filteredProjects.map((project: any) => (
                    <a
                        key={project.slug}
                        href={`/projekte/${project.slug}`}
                        className="group block"
                    >
                        {project.heroImage && (
                            <div className="overflow-hidden rounded-lg mb-4">
                                <img
                                    src={project.heroImage}
                                    alt={project.title}
                                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        )}
                        <h2 className="text-xl font-bold mb-2 group-hover:text-brand-red transition-colors">
                            {project.title}
                        </h2>
                        {project.client && (
                            <p className="text-gray-600">{project.client}</p>
                        )}
                        <span className="inline-block mt-2 text-sm font-semibold text-brand-red opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 transition-transform">
                            Mehr erfahren &rarr;
                        </span>
                    </a>
                ))}
            </div>
        </div>
    );
}
