import { FooterHome, Header } from '@/components';
import React, { ReactNode } from 'react';

export interface IDarkThemeLayoutProps {
    children: ReactNode;
}

export default function DarkThemeLayout({ children }: IDarkThemeLayoutProps) {
    const data = {
        footer: [
            {
                title: 'TERMS & CONDITIONS',
                link: '/',
            },
            {
                title: 'PRIVACY / COOKIES',
                link: '/',
            },
            {
                title: 'INSTAGRAM',
                link: '/',
            },
            {
                title: 'YOUTUBE',
                link: '/',
            },
            {
                title: 'NOTICE',
                link: '/',
            },
            {
                title: ' Q&A',
                link: '/',
            },
        ],
        infoAndConpyright: [
            {
                title: 'REGISTRATION: 261-81-01530',
                link: '',
            },
            {
                title: 'E-COMMERCE PERMIT: 2013-서울강남-02629',
                link: '',
            },
            {
                title: 'LEE@LAYERCOLTD.COM',
                link: '',
            },
            {
                title: 'CUSTOMER SERVICES: +82 02 511 7288',
                link: '',
            },
            {
                title: '3F, 139, DOSAN-DAERO, GANGNAM-GU, SEOUL, REPUBLIC OF KOREA',
                link: '',
            },
        ],
    };

    return (
        <>
            <Header themes="dark" />
            {children}
            <FooterHome />
        </>
    );
}
