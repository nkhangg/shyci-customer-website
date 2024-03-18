import Link from 'next/link';
import * as React from 'react';

export interface IArchivesNavProps {}

export default function ArchivesNav(props: IArchivesNavProps) {
    return (
        <div>
            <ul className="px-[10px] flex flex-col gap-5">
                <li className="flex flex-col gap-1">
                    <Link href={''} className="hover:underline ">
                        LMC X AVIREX
                    </Link>
                    <span>LMC X AVIREX</span>
                    <span>LMC X AVIREX</span>
                </li>
            </ul>
        </div>
    );
}
