'use client';
import { footers } from '@/data/common/data';
import * as React from 'react';

export interface IFooterFixedProps {}

export default function FooterFixed(props: IFooterFixedProps) {
    return (
        <footer className="fixed bg-white bottom-0 transition-all hover:h-[158px] ease-linear h-footer-fixed left-0 right-0 hidden md:flex md:items-center flex-col">
            <ul className="flex flex-col md:flex-row md:items-center px-5 py-4">
                {footers.footer.map((item) => {
                    return (
                        <li className="a-text" key={item.title}>
                            {item.title}
                        </li>
                    );
                })}
            </ul>
            <ul className="flex flex-col md:flex-row items-start md:items-center px-5 pb-10 pt-2 lg:pt-6 mb-2 flex-wrap justify-center">
                {footers.infoAndConpyright.map((item) => {
                    return (
                        <li className="a-text py-2" key={item.title}>
                            {item.title}
                        </li>
                    );
                })}
            </ul>
        </footer>
    );
}
