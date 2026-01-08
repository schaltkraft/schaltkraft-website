import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface PageContainerProps {
    children: ReactNode;
    className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
    return (
        <div className={cn("container-page w-full", className)}>
            {children}
        </div>
    );
}
