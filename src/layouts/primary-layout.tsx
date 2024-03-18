import { Header } from '@/components';
import React, { ReactNode } from 'react';

export interface IPrimaryLayoutProps {
    children: ReactNode;
}

export default function PrimaryLayout({ children }: IPrimaryLayoutProps) {
    return <>{children}</>;
}
