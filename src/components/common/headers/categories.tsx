'use client';
import { categories } from '@/data/common/data';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

export interface ICategoriesProps {}

export default function Categories(props: ICategoriesProps) {
    const ref = useRef<HTMLElement>(null);
    const [isDownScrolling, setIsDownScrolling] = useState(false);

    useEffect(() => {
        let position = window.scrollY;

        const handleScrolling = () => {
            var scroll = window.scrollY;
            if (scroll > position) {
                console.log('scrolling downwards');
                setIsDownScrolling(true);
            } else {
                console.log('scrolling upwards');
                setIsDownScrolling(false);
            }
            position = scroll;
        };

        window.addEventListener('scroll', handleScrolling);

        return () => removeEventListener('scroll', handleScrolling);
    }, []);
    return (
        <nav
            ref={ref}
            className={classNames('mb-4 mt-2 py-4 w-full flex items-center justify-center flex-wrap transition-all ease-linear', {
                ['opacity-0']: isDownScrolling,
            })}
        >
            {categories.map((item) => {
                return (
                    <Link
                        className={classNames('a-text py-2', {
                            ['text-red-600']: item.hightlight,
                        })}
                        href={item.link}
                        key={item.title}
                    >
                        {item.title}
                    </Link>
                );
            })}
        </nav>
    );
}
