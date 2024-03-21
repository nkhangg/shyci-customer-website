'use client';
import { FaMinus, FaPlus } from '@meronex/icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '..';
import { links } from '@/contans/routes';

export interface IProductBasketProps {}

export default function ProductBasket(props: IProductBasketProps) {
    const [isChecked, setIsChecked] = useState(false);

    const handleToogleChecked = () => {
        setIsChecked((prev) => !prev);
    };

    return (
        <div onClick={handleToogleChecked} className="py-8 w-full border-t border-primary text-sm relative cursor-pointer select-none">
            <figure className="relative w-[20%] aspect-square">
                <Image fill style={{ objectFit: 'cover' }} src={'https://lostmanagementcities.com/web/product/tiny/202403/8c85199dd881443b600aff8f0b835778.jpg'} alt="abc" />
            </figure>
            <Link onClick={(e) => e.stopPropagation()} href={links.products.detail('id', 'egwe')} className="a-text font-medium">
                LMC X AVIREX LEATHER MOTOR JACKET Black
            </Link>

            <div className="px-[10px] mt-2">
                <table className="table-auto">
                    <tbody className="">
                        <tr className="h-8">
                            <td className="w-[50%]">Giá:</td>
                            <td>200.000 VND</td>
                        </tr>
                        <tr className="h-8">
                            <td className="w-[50%]">Size:</td>
                            <td>S</td>
                        </tr>
                        <tr className="h-8">
                            <td className="w-[50%]">Số lượng:</td>
                            <td className="">
                                <div className=" flex items-center justify-between">
                                    <button className="px-2 active:scale-95  border-r border-primary">
                                        <FaMinus />
                                    </button>

                                    <input value={1} type="text" className="outline-none max-w-4 text-center flex-1 " />
                                    <button className="px-2 active:scale-95 border-l border-primary">
                                        <FaPlus />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <span className="a-text text-[11px] text-heart">xóa</span>

            <div className="absolute top-0 right-0 py-4">
                <input readOnly checked={isChecked} defaultValue={'checked'} type="checkbox" />
            </div>
        </div>
    );
}
