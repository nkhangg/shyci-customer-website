import { Categories, FooterFixed, FooterHome, Header } from '@/components';
import FullpageLoading from '@/components/common/loadings/full-page-loading';
import { categories } from '@/data/common/data';
import Link from 'next/link';
import React, { ReactNode, Suspense } from 'react';

export interface ILightThemeLayoutProps {
    children: ReactNode;
}

export default function LightThemeLayout({ children }: ILightThemeLayoutProps) {
    return (
        <>
            <Header />
            <Suspense fallback={<FullpageLoading />}>
                <main className="max-w-full my-header">{children}</main>
            </Suspense>

            <FooterHome mobile={true} />
            <FooterFixed />
        </>
    );
}
