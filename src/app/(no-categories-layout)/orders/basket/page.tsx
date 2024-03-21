'use client';
import { Button, ProductBasket } from '@/components';
import { links } from '@/contans/routes';
import { AiFillDownSquare } from '@meronex/icons/ai';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';

export interface IBasketPageProps {}

export default function BasketPage(props: IBasketPageProps) {
    const refBottom = useRef<HTMLSpanElement>(null);

    const handleSrollToPayment = () => {
        if (!refBottom.current) return;

        refBottom.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="flex items-center justify-center py-spacing-contaner">
            <div className="w-full px-primary md:w-[600px]">
                <h1 className="a-text-non-hover text-center text-[15px] font-medium">Giỏ hàng</h1>

                <div className="w-full my-8">
                    <ProductBasket />
                    {/* <ProductBasket />
                    <ProductBasket />
                    <ProductBasket />
                    <ProductBasket />
                    <ProductBasket /> */}
                </div>

                {/* info payment */}
                <div className="border-t border-b-2 border-primary py-4 text-sm">
                    <table className="w-full mb-4 border-spacing-0 border-[#ececec]">
                        <tfoot>
                            <tr>
                                <th align="left" className=" pl-2">
                                    Tạm tính
                                </th>
                                <td align="right" className="py-2">
                                    <span className="">250,000 VND</span>
                                </td>
                            </tr>

                            <tr className="order-total">
                                <th align="left" className=" pl-2">
                                    Tổng
                                </th>
                                <td align="right">
                                    <strong>
                                        <span className="">
                                            <bdi>
                                                250,000&nbsp;<span className="woocommerce-Price-currencySymbol">VND</span>
                                            </bdi>
                                        </span>
                                    </strong>{' '}
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                    <div>
                        <p className="pl-2 font-medium text-justify my-8 block text-[10px]">
                            Hoá đơn chưa kèm phí ship (Quý khách thanh toán bằng tiền mặt hoặc chuyển khoản theo yêu cầu với đơn hàng của shop).
                        </p>

                        <div className="px-2 flex items-center gap-2 cursor-pointer select-none text-xs">
                            <input id="rules" type="checkbox" />
                            <label htmlFor="rules" className=" cursor-pointer">
                                Tôi đã đọc và đồng ý với{' '}
                                <Link className="hover:underline text-violet-primary" href={links.rules}>
                                    điều khoản và điều kiện
                                </Link>{' '}
                                của website *
                            </label>
                        </div>

                        <div className="my-8 px-2">
                            <Button title="Đặt hàng" />
                        </div>

                        <div className="px-2">
                            <p className="text-[0.875rem] text-justify text-xs">
                                Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, tăng trải nghiệm sử dụng website, và cho các mục đích cụ thể khác đã được mô tả trong{' '}
                                <Link className="hover:underline text-violet-primary" href={links.rules}>
                                    chính sách riêng tư.
                                </Link>{' '}
                            </p>
                        </div>
                    </div>
                    <span ref={refBottom}></span>
                </div>
            </div>

            <div className="fixed text-[50px] bottom-10 right-4 md:bottom-20 md:right-10 z-30">
                <button className="" onClick={handleSrollToPayment}>
                    <AiFillDownSquare />
                </button>
            </div>
        </section>
    );
}
