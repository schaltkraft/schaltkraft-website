import { PageContainer } from '@/components/layout/PageContainer';
import { getTeamMembers } from '@/lib/cms-server';

interface TeamGridBlockProps {
    data: any;
}

// NOTE: Since this component is likely Server Component by usage in page.tsx (via SectionRenderer -> page.tsx)
// we CAN call getTeamMembers() directly if component is server-side.
// BUT SectionRenderer might be Client Component if it handles interactive state? 
// Current design: SectionRenderer is imported in page.tsx (Server Component).
// So this is safe ONLY if SectionRenderer is NOT "use client".
// Let's check imports. SectionRenderer doesn't use hooks. It is a Server Component compatible function.
// However, getTeamMembers() reads FS. 
// If specific team members are not passed in "data", we need to fetch them.
// Best pattern: data contains configurations, but we might need to fetch the collection.
// Actually, inside a Server Component (the block), we can await? No, SectionRenderer maps synchronously.
// 
// SOLUTION: We should duplicate needed team data into the Block Props from page.tsx OR 
// make this an Async component. Next.js 13+ supports async components.
// I will make this component async and fetch data.

export async function TeamGridBlock({ data }: TeamGridBlockProps) {
    const rawMembers = await getTeamMembers();

    // Define department order and labels
    const departments = [
        { id: 'management', label: 'Führung & Projektleitung' },
        { id: 'office', label: 'Buchhaltung & Personal' },
        { id: 'production', label: 'Produktion' },
    ];

    // Filter and sort members
    // Fallback: if 'department' is missing (old data), put in 'production' or handle gracefully.
    // For now we assume we will update all JSONs.

    // Helper to get department (default to production if undefined)
    const getDept = (m: any) => m.department || 'production';

    const groupedMembers = departments.map(dept => ({
        ...dept,
        members: rawMembers.filter((m: any) => getDept(m) === dept.id)
    }));

    // Add "Others" if any member has unknown department? 
    // Usually not needed if we control data.

    return (
        <section className="section-padding">
            <PageContainer>
                {/* Group Image */}
                {data.groupImage && (
                    <div className="mb-24 rounded-[3rem] overflow-hidden grayscale contrast-110">
                        <img src={data.groupImage} alt="Team Group" className="w-full h-auto" />
                    </div>
                )}

                {data.showMembers && rawMembers && (
                    <div className="space-y-32">
                        {groupedMembers.map((group) => (
                            group.members.length > 0 && (
                                <div key={group.id}>
                                    <h2 className="text-3xl lg:text-4xl font-bold font-heading uppercase mb-16 text-center border-b border-white/10 pb-8">
                                        {group.label}
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                                        {group.members.map((member: any, idx: number) => (
                                            <div key={idx} className="group">
                                                <div className="aspect-[3/4] rounded-[2rem] overflow-hidden bg-white/5 mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">
                                                    {member.image && (
                                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                                    )}
                                                </div>
                                                <div className="text-center">
                                                    <h3 className="text-xl font-bold uppercase">{member.name}</h3>
                                                    <p className="text-brand-orange text-sm font-medium mt-1 uppercase tracking-wide">{member.role}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                )}
            </PageContainer>
        </section>
    );
}
