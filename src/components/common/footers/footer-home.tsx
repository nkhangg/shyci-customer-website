import { footers } from '@/data/common/data';
import * as React from 'react';

export interface IFooterHomeProps {}

export default function FooterHome(props: IFooterHomeProps) {
    return (
        <footer className="mt-11 flex items-start md:items-center justify-center flex-col">
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
