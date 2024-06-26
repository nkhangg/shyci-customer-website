import { Categories, FooterFixed, FooterHome, Header } from '@/components';
import React, { ReactNode } from 'react';

export interface ILightThemeLayoutProps {
    children: ReactNode;
}

export default function LightThemeLayout({ children }: ILightThemeLayoutProps) {
    return (
        <>
            <Header categories={true} />
            <main className="max-w-full py-header-categories my-header">{children}</main>

            <FooterHome mobile={true} />
            <FooterFixed />
        </>
    );
}
