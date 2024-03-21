'use client';
import { Button, ProducDetailSlide, SizeButton } from '@/components';
import { FaMinus, FaPlus } from '@meronex/icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent, useRef, useState } from 'react';

export interface IProductDetailProps {
    params: { params: string[] };
}

const sizes = ['s', 'm', 'l', 'xl', '2xl'];

export default function ProductDetail({ params }: IProductDetailProps) {
    const [size, setSize] = useState<ISize | null>(null);
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        if (!size) return;
        setQuantity(quantity + 1);
    };
    const handleDescrement = () => {
        if (quantity <= 0 || !size) return;
        setQuantity(quantity - 1);
    };

    const handleWriteQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        if (!size) return 0;

        if (!e.target.value) return 0;

        const value = e.target.value;

        if (Number.isNaN(value)) {
            setQuantity(quantity);
            return;
        }

        if (Number(value) < 0 || (size.repositories && Number(value) > size.repositories)) {
            setQuantity(quantity);
            return;
        }

        setQuantity(Number(value));
    };
    return (
        <section className="lg:px-primary md:py-spacing-contaner">
            <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                <>
                    <div className="flex-1 hidden lg:grid grid-cols-2 gap-1">
                        {Array.from({ length: 6 }).map((item, index) => {
                            return (
                                <figure key={index} className=" w-full aspect-square relative">
                                    <Image
                                        fill
                                        objectFit="cover"
                                        src={'https://lostmanagementcities.com/web/product/extra/small/202403/574f157e7b8f83cd6153878daeee5faf.jpg'}
                                        alt="https://lostmanagementcities.com/web/product/extra/small/202403/574f157e7b8f83cd6153878daeee5faf.jpg"
                                    />
                                </figure>
                            );
                        })}
                    </div>

                    <div className="w-full lg:hidden">
                        <ProducDetailSlide />
                    </div>
                </>
                <div className=" w-full lg:w-2/6 text-[1rem] py-4 px-primary lg:px-0">
                    <div className="flex flex-col gap-1">
                        <h1 className="a-text-non-hover">LMC X AVIREX LEATHER MOTOR JACKET Black</h1>
                        <del className="px-[10px] text-sm">260.000 VND</del>

                        <div className="px-[10px] flex items-center gap-2 text-sm">
                            <span>200.000 VND</span>
                            <span>30%</span>
                        </div>
                    </div>

                    {/* sizes */}
                    <div className="flex items-center gap-2 px-[10px] my-8">
                        {sizes.map((item, index) => {
                            return <SizeButton onClick={() => setSize({ title: item })} key={index} active={(size && size?.title === item) || false} title={item} />;
                        })}
                    </div>

                    {/* quantities */}
                    <div className="flex items-center gap-2 px-[10px]">
                        <button onClick={handleDescrement} className="p-4 active:scale-95">
                            <FaMinus />
                        </button>

                        <input onChange={handleWriteQuantity} type="text" value={quantity} className="outline-none max-w-8 text-center" />
                        <button onClick={handleIncrement} className="p-4 active:scale-95">
                            <FaPlus />
                        </button>
                    </div>

                    {/* lables */}
                    <div className="px-[10px] text-xs my-8">
                        <span>Tổng tiền và số lượng: 200.000 ({quantity})</span>
                    </div>

                    <div className="mx-[10px] border-t border-gray-200 flex flex-col items-center py-8 gap-4 border-b-2 border-b-primary">
                        <Button title="Mua ngay" />
                        <Button title="Thêm vào giỏ hàng" />
                    </div>

                    <div className="px-[10px] my-8">
                        <h2 className="a-text-no-hover text-[12px] font-medium">mô tả sản phẩm</h2>

                        <div className="text-[11px] normal-case py-4">
                            200G/M SINGLE COTTON LMC WATER SPLASH PRINT (cm) Small : Length 66, Shoulder 46, Chest 50, Sleeve 18.5 Medium : Length 71, Shoulder 49, Chest 55, Sleeve
                            21.5 Large : Length 73, Shoulder 50, Chest 57, Sleeve 23 XLarge : Length 75, Shoulder 53, Chest 61, Sleeve 24.5 Man : 187cm / Size : L Style Code :
                            0LM24CTS108WHT Material : Cotton 100% Manufacturer : LAYER. co., ltd. / Made in China
                        </div>
                    </div>
                    <div className="px-[10px] my-8">
                        <h2 className="a-text-no-hover text-[12px] font-medium">sản phẩm tương tự</h2>

                        <div className="text-[11px] normal-case py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {Array.from({ length: 4 }).map((item, index) => {
                                return (
                                    <div key={index} className="flex flex-col items-center text-center line-clamp-3">
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
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
