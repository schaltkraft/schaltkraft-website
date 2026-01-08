import { getAllServices, getAllJobs } from '@/lib/cms-server';

import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://schaltkraft.ch';

    // Static routes
    const routes = [
        '',
        '/about-us',
        '/team',
        '/contact',
        '/dienstleistungen',
        '/jobs',
        '/agb',
        '/impressum',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Services
    const services = await getAllServices();
    const serviceRoutes = services.map((service: any) => ({
        url: `${baseUrl}/dienstleistungen/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }));

    // Projects (if we had detail pages, for now just list page is handled above)
    // But if we add detail pages later:
    /*
    const projects = await getAllProjects();
    const projectRoutes = projects.map((project: any) => ({
      url: `${baseUrl}/projekte/${project.slug}`,
      ...
    }));
    */

    // Jobs
    const jobs = await getAllJobs();
    const jobRoutes = jobs.map((job: any) => ({
        url: `${baseUrl}/jobs/${job.slug}`,
        lastModified: new Date(job.datePosted),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    return [...routes, ...serviceRoutes, ...jobRoutes];

}
