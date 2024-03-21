import { footers } from '@/data/common/data';
import classNames from 'classnames';
import React from 'react';

export interface IFooterHomeProps {
    mobile?: boolean;
}

export default function FooterHome({ mobile = false }: IFooterHomeProps) {
    return (
        <footer
            className={classNames('', {
                ['mt-11 flex items-start md:items-center justify-center flex-col']: !mobile,
                ['mt-11 flex items-start justify-center flex-col md:hidden md:invisible']: mobile,
            })}
        >
            <ul className="flex flex-col md:flex-row md:items-center px-5 ">
                {footers.footer.map((item) => {
                    return (
                        <li className="a-text" key={item.title}>
                            {item.title}
                        </li>
                    );
                })}
            </ul>
            <ul className="flex flex-col md:flex-row items-start md:items-center px-5 pb-14 pt-10 mb-2">
                {footers.infoAndConpyright.map((item) => {
                    return (
                        <li className="a-text" key={item.title}>
                            {item.title}
                        </li>
                    );
                })}
            </ul>
        </footer>
    );
}
