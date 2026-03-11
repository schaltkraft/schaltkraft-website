import { PageContainer } from '@/components/layout/PageContainer';
import { getTeamMembers } from '@/lib/cms-server';
import { TeamGridClient } from './TeamGridClient';
import Image from 'next/image';

interface TeamGridBlockProps {
    data: any;
}

export async function TeamGridBlock({ data }: TeamGridBlockProps) {
    const teamData = await getTeamMembers();

    // Define department order and labels - data is now pre-organized by department
    const groupedMembers = [
        { id: 'management', label: 'Führung & Projektleitung', members: teamData.management || [] },
        { id: 'office', label: 'Buchhaltung & Personal', members: teamData.office || [] },
        { id: 'production', label: 'Produktion', members: teamData.production || [] },
    ];

    // Check if there are any members at all
    const hasMembers = groupedMembers.some(dept => dept.members.length > 0);

    return (
        <section className="section-padding-compact">
            <PageContainer>
                {/* Group Image */}
                {data.groupImage && (
                    <div className="mb-16 md:mb-24 rounded-xl md:rounded-[3rem] overflow-hidden grayscale contrast-110">
                        <Image src={data.groupImage} alt="Team Group" width={1200} height={600} className="w-full h-auto" />
                    </div>
                )}

                {data.showMembers && hasMembers && (
                    <TeamGridClient groupedMembers={groupedMembers} />
                )}
            </PageContainer>
        </section>
    );
}
