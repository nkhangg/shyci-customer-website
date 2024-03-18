import { Header } from '@/components';
import React, { ReactNode } from 'react';

export interface ILightThemeLayoutProps {
    children: ReactNode;
}

export default function LightThemeLayout({ children }: ILightThemeLayoutProps) {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    );
}
