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
            <Categories />
            <main className="max-w-full">{children}</main>

            <FooterHome mobile={true} />
            <FooterFixed />
        </>
    );
}
