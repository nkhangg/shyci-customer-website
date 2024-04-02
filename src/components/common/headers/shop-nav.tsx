/* eslint-disable @next/next/no-img-element */
'use client';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { links } from '@/contans/routes';
import { useGetCategories } from '@/hooks';

export interface IShopNavProps {
    drawer?: boolean;
}

export default function ShopNav({ drawer = false }: IShopNavProps) {
    const { dataMemoCategories, dataMemoProducts } = useGetCategories();

    return (
        <div
            className={classNames('', {
                'text-[15px] font-medium': drawer,
            })}
        >
            <ul className="px-[10px] flex flex-col gap-5 ">
                <li className="flex flex-col gap-1">
                    {dataMemoCategories.map((item) => {
                        return (
                            <Link key={item.id} href={links.products.queriesCategories(item, 'categories')} className="hover:underline ">
                                {item.name}
                            </Link>
                        );
                    })}
                </li>
            </ul>

            <div
                className={classNames('my-5 flex flex-col gap-2', {
                    'px-[10px]': !drawer,
                })}
            >
                <span>new</span>
                <div className="grid grid-cols-3 gap-2 px-[10px]">
                    {dataMemoProducts.map((item) => {
                        return (
                            <div key={item.id} className="flex flex-col items-center text-center line-clamp-3">
                                <div className="w-full aspect-[2/3] relative mb-2">
                                    <img style={{ objectFit: 'cover' }} src={item?.images[0]?.name} alt={item?.images[0]?.name} />
                                </div>
                                <Link href={links.products.detail(item.id, item.name)} className="hover:underline">
                                    {item.name}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
