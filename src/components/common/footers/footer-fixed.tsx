import { footers } from '@/data/common/data';
import Link from 'next/link';
import * as React from 'react';

export interface IFooterFixedProps {}

export default function FooterFixed(props: IFooterFixedProps) {
    return (
        <footer className="fixed -bottom-[16%] bg-white lg:-bottom-[14%] xl:-bottom-[12%] hover:bottom-0 transition-all ease-linear left-0 right-0 hidden md:flex md:items-center justify-center flex-col">
            <ul className="flex flex-col md:flex-row md:items-center px-5 ">
                {footers.footer.map((item) => {
                    return (
                        <li className="a-text" key={item.title}>
                            {item.title}
                        </li>
                    );
                })}
            </ul>
            <ul className="flex flex-col md:flex-row items-start md:items-center px-5 pb-14 pt-10 mb-2 flex-wrap justify-center">
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
