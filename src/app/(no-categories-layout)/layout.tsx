import { Categories, FooterFixed, FooterHome, Header } from '@/components';
import { categories } from '@/data/common/data';
import Link from 'next/link';
import React, { ReactNode } from 'react';

export interface ILightThemeLayoutProps {
    children: ReactNode;
}

export default function LightThemeLayout({ children }: ILightThemeLayoutProps) {
    return (
        <>
            <Header />
            <main className="max-w-full my-header">{children}</main>

            <FooterHome mobile={true} />
            <FooterFixed />
        </>
    );
}
