'use client';
import { FaMinus, FaPlus } from '@meronex/icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent, MouseEvent, useContext, useEffect, useState } from 'react';
import { links } from '@/contans/routes';
import { ICartData } from '../../../interface';
import { calaculateDiscount, toCurrency } from '@/ultils/funtions';
import { confirmAlert } from 'react-confirm-alert';
import { CartContextProvider } from '../common/providers/contexts/cart-context';

export interface IProductBasketProps {
    data: ICartData;
}

export default function ProductBasket({ data }: IProductBasketProps) {
    const [isChecked, setIsChecked] = useState(data.checked);

    const [quantity, setQuantity] = useState(data.quantity);

    const handleToogleChecked = () => {
        setIsChecked((prev) => !prev);

        if (!updateChecked) return;
        updateChecked(data);
    };

    const { deleteCart, updateQuantity, updateChecked } = useContext(CartContextProvider);

    const handleDeleteItem = (e: MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="shadow-xl rounded-lg p-4 flex flex-col justify-between bg-white gap-4 ">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-[16px] font-medium">{'Xác nhận xóa'}</h1>
                            <p className="">
                                Bạn muốn xóa <b>{data.name}</b> khỏi giỏ hàng ?
                            </p>
                        </div>

                        <div className="flex items-center justify-end gap-4">
                            <button
                                onClick={() => {
                                    onClose();
                                }}
                                className="py-2 px-4 rounded-md bg-[#333] text-white"
                            >
                                Không
                            </button>
                            <button
                                className="py-2 px-4 rounded-md hover:bg-[#333] hover:text-white transition-all ease-linear"
                                onClick={() => {
                                    if (deleteCart) {
                                        deleteCart(data);
                                    }

                                    onClose();
                                }}
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                );
            },
        });
    };

    const handleIncrement = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (quantity >= data.size.store) return;
        setQuantity(quantity + 1);
    };
    const handleDescrement = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (quantity <= 1) return;
        setQuantity(quantity - 1);
    };

    const handleWriteQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        if (!data.size) return 1;

        if (!e.target.value) return 0;

        const value = e.target.value;

        if (Number.isNaN(value)) {
            setQuantity(quantity);
            return;
        }

        if (Number(value) <= 0 || (data.size.store && Number(value) > data.size.store)) {
            setQuantity(quantity);
            return;
        }

        setQuantity(Number(value));
    };

    useEffect(() => {
        if (quantity === data.quantity || !updateQuantity) return;

        updateQuantity(data, quantity);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantity, data]);

    useEffect(() => {
        setIsChecked(data.checked);
    }, [data.checked]);

    return (
        <div className="py-8 w-full border-t border-primary text-sm relative cursor-pointer select-none">
            <div className="flex gap-1 flex-col">
                <figure className="relative w-[20%] aspect-square ml-[10px]">
                    <Image fill style={{ objectFit: 'cover' }} src={data?.images[0]?.name} alt={data?.images[0]?.name} />
                </figure>
                <Link onClick={(e) => e.stopPropagation()} href={links.products.detail(data.id, data.name)} className="a-text font-medium">
                    {data.name} {data.size.discount > 0 ? `(${data.size.discount}%)` : ''}
                </Link>
            </div>

            <div className="px-[10px] mt-2">
                <table className="table-auto">
                    <tbody className="">
                        <tr className="h-8">
                            <td className="w-[50%]">Giá:</td>
                            <td>{toCurrency(calaculateDiscount(data.size.price, data.size.discount))}</td>
                        </tr>
                        {data.showSize && (
                            <tr className="h-8">
                                <td className="w-[50%]">Size:</td>
                                <td>{data.size.name}</td>
                            </tr>
                        )}
                        <tr className="h-8">
                            <td className="w-[50%]">Số lượng:</td>
                            <td className="">
                                <div className=" flex items-center justify-between">
                                    <button onClick={handleDescrement} className="px-2 a  border-r border-primary">
                                        <FaMinus />
                                    </button>

                                    <input onChange={handleWriteQuantity} value={quantity} type="text" className="outline-none max-w-4 text-center flex-1 mx-1" />
                                    <button onClick={handleIncrement} className="px-2 a border-l border-primary">
                                        <FaPlus />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <span onClick={handleDeleteItem} className="a-text text-[11px] text-heart">
                xóa
            </span>

            <div onClick={handleToogleChecked} className="absolute top-0 right-[10px] py-4">
                <input className="h-5 w-5" readOnly checked={isChecked} defaultValue={'checked'} type="checkbox" />
            </div>
        </div>
    );
}
