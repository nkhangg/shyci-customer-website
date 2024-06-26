import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { PrimaryLayout } from '@/layouts';
import './globals.css';
import 'keen-slider/keen-slider.min.css';
import 'react-modern-drawer/dist/index.css';

const monterat = Montserrat({ subsets: ['latin'], weight: ['400', '300', '500', '600', '700', '800'] });

export const metadata: Metadata = {
    title: 'LMC-Website',
    description: 'Generated by LMC-Website',
    icons: '/favicon.ico',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={monterat.className}>
                <PrimaryLayout>{children}</PrimaryLayout>
            </body>
        </html>
    );
}
