import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface IShopNavProps {
    drawer?: boolean;
}

export default function ShopNav({ drawer = false }: IShopNavProps) {
    return (
        <div
            className={classNames('', {
                'text-[15px] font-medium': drawer,
            })}
        >
            <ul className="px-[10px] flex flex-col gap-5 ">
                <li className="text-red-500">SPRING CAMPAIGN</li>

                <li className="flex flex-col gap-1">
                    <Link href={''} className="hover:underline ">
                        LMC X AVIREX
                    </Link>
                    <span>LMC X AVIREX</span>
                    <span>LMC X AVIREX</span>
                </li>
                <li className="flex flex-col gap-1">
                    <span>LMC X AVIREX</span>
                    <span>LMC X AVIREX</span>
                    <span>LMC X AVIREX</span>
                    <span>LMC X AVIREX</span>
                    <span>LMC X AVIREX</span>
                    <span>LMC X AVIREX</span>
                    <span>LMC X AVIREX</span>
                    <span>LMC X AVIREX</span>
                </li>
            </ul>

            <div
                className={classNames('my-5 flex flex-col gap-2', {
                    'px-[10px]': !drawer,
                })}
            >
                <span>ranking</span>
                <div className="grid grid-cols-3 gap-2 px-[10px]">
                    <div className="flex flex-col items-center text-center line-clamp-3">
                        <div className="w-full aspect-[2/3] relative mb-2">
                            <Image
                                style={{ objectFit: 'cover' }}
                                fill
                                src={'https://lostmanagementcities.com/web/product/medium/202303/390bcbd16547c0d76af0ed1528dbe61d.jpg'}
                                alt="a"
                            />
                        </div>
                        <Link href={''} className="hover:underline">
                            THORNS WIZARD COACH JACKET beige
                        </Link>
                    </div>
                    <div className="flex flex-col items-center text-center line-clamp-3">
                        <div className="w-full aspect-[2/3] relative mb-2">
                            <Image
                                style={{ objectFit: 'cover' }}
                                fill
                                src={'https://lostmanagementcities.com/web/product/medium/202303/390bcbd16547c0d76af0ed1528dbe61d.jpg'}
                                alt="a"
                            />
                        </div>
                        <Link href={''} className="hover:underline">
                            THORNS WIZARD COACH JACKET beige
                        </Link>
                    </div>
                    <div className="flex flex-col items-center text-center line-clamp-3">
                        <div className="w-full aspect-[2/3] relative mb-2">
                            <Image
                                style={{ objectFit: 'cover' }}
                                fill
                                src={'https://lostmanagementcities.com/web/product/medium/202303/390bcbd16547c0d76af0ed1528dbe61d.jpg'}
                                alt="a"
                            />
                        </div>
                        <Link href={''} className="hover:underline">
                            THORNS WIZARD COACH JACKET beige
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
