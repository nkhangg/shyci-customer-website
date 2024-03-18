import { Header } from '@/components';
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
            <nav>
                {categories.map((item) => {
                    return (
                        <Link href={item.link} key={item.title}>
                            {item.title}
                        </Link>
                    );
                })}
            </nav>
            <main>{children}</main>
        </>
    );
}
