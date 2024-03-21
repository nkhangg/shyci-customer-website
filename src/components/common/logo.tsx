import { links } from '@/contans/routes';
import Link from 'next/link';
import React from 'react';
import { Inter, Mandali } from 'next/font/google';
import classNames from 'classnames';

const mandali = Mandali({ subsets: ['latin'], weight: ['400'] });

export interface ILogoProps {
    themes?: 'dark' | 'light';
}

export default function Logo({ themes = 'light' }: ILogoProps) {
    return (
        <Link
            href={links.home}
            className={classNames('relative w-[80px] h-[33px] flex items-center justify-center overflow-hidden ', {
                ['text-primary-light']: themes === 'dark',
                ['text-primary']: themes === 'light',
                [mandali.className]: true,
            })}
        >
            {/* <Image
        fill
        style={{ objectFit: 'cover' }}
        className=""
        src={themes === 'light' ? '/images/spyci_logo.png' : '/images/spyci_logo-lagre.jpg'}
        alt="/images/lmc_logo.png"
    /> */}
            <span className=" text-lg font-semibold tracking-widest">Shyci</span>
        </Link>
    );
}
