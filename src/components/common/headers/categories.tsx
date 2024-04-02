'use client';
import { categories } from '@/data/common/data';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useGetCategories } from '@/hooks';
import { links } from '@/contans/routes';
import { useQueryState } from 'nuqs';

export interface ICategoriesProps {}

export default function Categories(props: ICategoriesProps) {
    const ref = useRef<HTMLElement>(null);
    const [isDownScrolling, setIsDownScrolling] = useState(false);

    const { dataMemoCategories } = useGetCategories();

    const [name] = useQueryState('id');

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
            <Link
                className={classNames('a-text py-2', {
                    ['text-red-600']: false,
                })}
                href={links.products.index}
            >
                {'Tất cả'}
            </Link>
            {dataMemoCategories.map((item) => {
                return (
                    <Link
                        className={classNames('a-text py-2', {
                            ['text-red-600']: false,
                            ['underline']: name === item.id,
                        })}
                        href={links.products.queriesCategories(item, 'categories')}
                        key={item.id}
                    >
                        {item.name}
                    </Link>
                );
            })}
        </nav>
    );
}
