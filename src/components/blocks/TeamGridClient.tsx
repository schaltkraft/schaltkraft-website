'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations';

interface TeamGridClientProps {
    groupedMembers: {
        id: string;
        label: string;
        members: any[];
    }[];
}

export function TeamGridClient({ groupedMembers }: TeamGridClientProps) {
    return (
        <div className="space-y-12 md:space-y-20">
            {groupedMembers.map((group) => (
                group.members.length > 0 && (
                    <motion.div
                        key={group.id}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        variants={staggerContainer}
                    >
                        <motion.h2
                            variants={fadeInUp}
                            className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading uppercase mb-8 md:mb-10 text-center border-b border-white/10 pb-4 md:pb-6"
                        >
                            {group.label}
                        </motion.h2>
                        <motion.div
                            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-x-8 md:gap-y-16"
                            variants={staggerContainer}
                        >
                            {group.members.map((member: any, idx: number) => (
                                <motion.div
                                    key={idx}
                                    className="group"
                                    variants={fadeInUp}
                                >
                                    <motion.div
                                        className="aspect-[3/4] rounded-lg md:rounded-[2rem] overflow-hidden bg-white/5 mb-4 md:mb-6 grayscale group-hover:grayscale-0 transition-all duration-500"
                                        whileHover={{ scale: 1.03 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {member.image && (
                                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                        )}
                                    </motion.div>
                                    <div className="text-center">
                                        <h3 className="text-base md:text-xl font-bold uppercase">{member.name}</h3>
                                        <p className="text-brand-orange text-xs md:text-sm font-medium mt-1 uppercase tracking-wide">{member.role}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )
            ))}
        </div>
    );
}
