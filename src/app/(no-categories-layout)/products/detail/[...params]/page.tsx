'use client';
import { Button, NotFound, PrimaryLoading, ProducDetailSlide, SizeButton } from '@/components';
import { FaMinus, FaPlus } from '@meronex/icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent, useCallback, useContext, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ISize } from '../../../../../../interface';
import { useQuery } from '@tanstack/react-query';
import { getProduct, getProducts } from '@/apis/handlers/products';
import { calaculateDiscount, toCurrency } from '@/ultils/funtions';
import MDEditor from '@uiw/react-md-editor';
import FullpageLoading from '@/components/common/loadings/full-page-loading';
import { links } from '@/contans/routes';
import { CartContextProvider } from '@/components/common/providers/contexts/cart-context';
import { useRouter } from 'next/navigation';
export interface IProductDetailProps {
    params: { params: string[] };
}

export default function ProductDetail({ params }: IProductDetailProps) {
    const router = useRouter();

    const { data, isLoading, isFetched } = useQuery({
        queryKey: ['get detail product', params.params[0]],
        queryFn: () => getProduct(params.params[0]),
    });

    const products = useQuery({
        queryKey: ['get detail product-relationship', params.params[0]],
        queryFn: () => getProducts({ limit: 4, categories: Number(data?.data?.category.id) || undefined }),
    });

    const { setCart, cart } = useContext(CartContextProvider);

    const memoData = useMemo(() => {
        if (!data || !data.data) return null;

        return data.data;
    }, [data]);

    const productRelationship = useMemo(() => {
        if (!products || !products.data) return [];

        return products?.data.items;
    }, [products]);

    const [size, setSize] = useState<ISize | null>(null);
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        if (!size || quantity >= size.store) return;
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

        if (Number(value) < 0 || (size.store && Number(value) > size.store)) {
            setQuantity(quantity);
            return;
        }

        setQuantity(Number(value));
    };

    const handleClickSize = (data: ISize) => {
        if (quantity > data.store) {
            setQuantity(data.store);
        }

        setSize(data);
    };

    const handleAddCart = () => {
        if (!size || !memoData || !setCart) return;

        setCart({
            name: memoData.name,
            category: memoData.category,
            id: memoData.id,
            images: memoData.images,
            showSize: memoData.showSize,
            quantity,
            size,
            checked: true,
        });
    };

    const handleBuyNow = () => {
        handleAddCart();

        router.push(links.orders.basket + `?type=now`);
    };

    useLayoutEffect(() => {
        if (!memoData) return;

        setSize(memoData.sizes[0]);
    }, [memoData]);

    return (
        <section className="lg:px-primary md:py-spacing-contaner">
            {memoData && (
                <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                    <>
                        <div className="flex-1 hidden lg:grid grid-cols-2 gap-1">
                            {memoData?.images.map((item, index) => {
                                return (
                                    <figure key={index} className=" w-full aspect-square relative">
                                        <Image fill objectFit="cover" src={item.name} alt={item.name} />
                                    </figure>
                                );
                            })}
                        </div>

                        <div className="w-full lg:hidden">
                            <ProducDetailSlide data={memoData.images} />
                        </div>
                    </>
                    <div className=" w-full lg:w-2/6 text-[1rem] py-4 px-primary lg:px-0">
                        <div className="flex flex-col gap-1">
                            <h1 className="a-text-non-hover">{memoData.name}</h1>
                            <del className="px-[10px] text-sm">{size ? size.price : toCurrency(memoData.sizes[0].price)}</del>

                            <div className="px-[10px] flex items-center gap-2 text-sm">
                                <span>
                                    {size
                                        ? toCurrency(calaculateDiscount(size.price, size.discount))
                                        : toCurrency(calaculateDiscount(memoData.sizes[0].price, memoData.sizes[0].discount))}
                                </span>
                                <span>{size ? size.discount : memoData.sizes[0].discount}%</span>
                            </div>
                        </div>

                        {/* sizes */}
                        {memoData.showSize && (
                            <div className="flex items-center gap-2 px-[10px] mt-8">
                                {memoData.sizes.map((item, index) => {
                                    return <SizeButton onClick={() => handleClickSize(item)} key={index} data={item} active={(size && size?.id === item.id) || false} />;
                                })}
                            </div>
                        )}

                        {/* quantities */}
                        <div className="flex items-center gap-2 px-[10px] mt-8">
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
                            {size && (
                                <span>
                                    Tổng tiền và số lượng: {toCurrency(quantity * size?.price)} ({quantity})
                                </span>
                            )}
                        </div>

                        <div className="mx-[10px] border-t border-gray-200 flex flex-col items-center py-8 gap-4 border-b-2 border-b-primary">
                            <Button onClick={handleBuyNow} title="Mua ngay" />
                            <Button onClick={handleAddCart} title="Thêm vào giỏ hàng" />
                        </div>

                        <div className="px-[10px] my-8">
                            <h2 className="a-text-no-hover text-[12px] font-medium">mô tả sản phẩm</h2>

                            <div id="description" className="text-[11px] normal-case py-4" data-color-mode="light">
                                <MDEditor.Markdown source={memoData.description} />
                            </div>
                        </div>
                        {productRelationship && (
                            <div className="px-[10px] my-8">
                                <h2 className="a-text-no-hover text-[12px] font-medium">sản phẩm tương tự</h2>

                                <div className="text-[11px] normal-case py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {productRelationship.map((item, index) => {
                                        return (
                                            <div key={index} className="flex flex-col items-center text-center line-clamp-3">
                                                <div className="w-full aspect-[2/3] relative mb-2">
                                                    <Image style={{ objectFit: 'cover' }} fill src={item.images[0].name} alt={item.images[0].name} />
                                                </div>
                                                <Link href={links.products.detail(item.id, item.name)} className="hover:underline">
                                                    {item.name}
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {products.isLoading && (
                            <div className="w-full h-fit flex items-center justify-center">
                                <PrimaryLoading />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {!memoData && isFetched && <NotFound />}

            {isLoading && <FullpageLoading />}
        </section>
    );
}
