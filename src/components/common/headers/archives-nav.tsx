import { archives } from '@/data/common/data';
import Link from 'next/link';
import React from 'react';

export interface IArchivesNavProps {}

export default function ArchivesNav(props: IArchivesNavProps) {
    return (
        <div>
            <ul className="px-[10px] flex flex-col gap-5">
                <li className="flex flex-col gap-1">
                    {archives.map((item) => {
                        return (
                            <Link key={item.title} href={item.link} className="hover:underline font-medium">
                                {item.title}
                            </Link>
                        );
                    })}
                </li>
            </ul>
        </div>
    );
}
