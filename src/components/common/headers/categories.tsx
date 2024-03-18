import { categories } from '@/data/common/data';
import Link from 'next/link';
import React from 'react';
import DivAnitmation from '../dynamics/div-animation';
import classNames from 'classnames';

export interface ICategoriesProps {}

export default function Categories(props: ICategoriesProps) {
    return (
        <DivAnitmation>
            <nav className="my-5 py-5 w-full flex items-center justify-center flex-wrap">
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
        </DivAnitmation>
    );
}
