'use client';
import { Button, NotFound, ProductBasket } from '@/components';
import { CartContextProvider } from '@/components/common/providers/contexts/cart-context';
import { links } from '@/contans/routes';
import { calaculateDiscount, toCurrency } from '@/ultils/funtions';
import { AiFillDownSquare } from '@meronex/icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';

export interface IBasketPageProps {}

export default function BasketPage(props: IBasketPageProps) {
    const router = useRouter();

    const refBottom = useRef<HTMLSpanElement>(null);
    const { cart, checkAll } = useContext(CartContextProvider);

    const [type] = useQueryState('type');

    const [isChecked, setIsChecked] = useState(false);

    const [message, setMessage] = useState<null | string>(null);

    const handleSrollToPayment = () => {
        if (!refBottom.current) return;

        refBottom.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleToogleChecked = () => {
        setIsChecked((prev) => !prev);

        if (!checkAll) return;
        checkAll(!isChecked);
    };

    const validate = () => {
        if (!cart?.length) {
            setMessage('Bạn chưa hàng trong giỏ');
            return true;
        }

        const cartCheck = cart.filter((item) => item.checked);

        if (cartCheck.length <= 0) {
            setMessage('Bạn chưa hàng trong giỏ');
            return true;
        }

        setMessage(null);
        return false;
    };

    const handleOrders = () => {
        if (validate()) return;
        router.push(links.orders.checkout);
    };

    const total = useMemo(() => {
        if (!cart) return 0;

        const result = cart.reduce((cur, value) => {
            if (value.checked) {
                cur += value.size.price * value.quantity * (1 - value.size.discount / 100);
            }

            return cur;
        }, 0);

        return result;
    }, [cart]);

    useEffect(() => {
        if (!cart) return;

        const check = cart.every((item) => item.checked);

        setIsChecked(check);
    }, [cart]);

    useEffect(() => {
        if (!type) return;

        if (type === 'now') {
            handleSrollToPayment();
        }
    }, [type]);

    return (
        <section className="flex items-center justify-center py-spacing-contaner">
            <div className="w-full px-primary md:w-[600px]">
                <h1 className="a-text-non-hover text-center text-[15px] font-medium">Giỏ hàng</h1>

                {cart && cart.length > 0 && (
                    <>
                        <div onClick={handleToogleChecked} className="w-full pr-[10px] flex justify-end items-center -mb-6 mt-8">
                            <input className="h-5 w-5" checked={isChecked} readOnly defaultValue={'checked'} type="checkbox" />
                        </div>
                        <div className="w-full my-8">
                            {cart.map((item, index) => {
                                return <ProductBasket data={item} key={item.id + index} />;
                            })}
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
                                            <span className="">{toCurrency(total)}</span>
                                        </td>
                                    </tr>

                                    <tr className="order-total">
                                        <th align="left" className=" pl-2">
                                            Tổng
                                        </th>
                                        <td align="right">
                                            <strong>
                                                <span className="">
                                                    <bdi>{toCurrency(total)}</bdi>
                                                </span>
                                            </strong>{' '}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>

                            <div className="">
                                <div onClick={handleOrders} className="my-8 px-2 flex flex-col gap-2">
                                    <Button title="Tiến hành thanh toán" />
                                    {message && <small className="text-heart text-center">{message}</small>}
                                </div>
                            </div>

                            {/* <div>
                                <p className="pl-2 font-medium text-justify my-8 block text-[10px]">
                                    Hoá đơn chưa kèm phí ship (Quý khách thanh toán bằng tiền mặt hoặc chuyển khoản theo yêu cầu với đơn hàng của shop).
                                </p>

                                <div className="px-2 flex items-center gap-2 cursor-pointer select-none text-xs">
                                    <input checked={isRule} id="rules" onChange={handleToogleRule} type="checkbox" />
                                    <label htmlFor="rules" className=" cursor-pointer">
                                        Tôi đã đọc và đồng ý với{' '}
                                        <Link className="hover:underline text-violet-primary" href={links.rules}>
                                            điều khoản và điều kiện
                                        </Link>{' '}
                                        của website <span className="text-heart">*</span>
                                    </label>
                                </div>

                                <div onClick={handleOrders} className="my-8 px-2 flex flex-col gap-2">
                                    <Button title="Tiến hành thanh toán" />
                                    {message && <small className="text-heart text-center">{message}</small>}
                                </div>

                                <div className="px-2">
                                    <p className="text-[0.875rem] text-justify text-xs">
                                        Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, tăng trải nghiệm sử dụng website, và cho các mục đích cụ thể khác đã được mô tả
                                        trong{' '}
                                        <Link className="hover:underline text-violet-primary" href={links.privacy}>
                                            chính sách riêng tư.
                                        </Link>{' '}
                                    </p>
                                </div>
                            </div> */}
                            <span ref={refBottom}></span>
                        </div>
                    </>
                )}

                {(!cart || !cart.length) && (
                    <div className="my-8 flex items-center justify-center gap-2">
                        <span>Giỏi hàng của bạn đang trống</span>
                        <Link href={links.products.index} className="hover:underline text-violet-primary">
                            Quay lại trang mua hàng
                        </Link>
                    </div>
                )}
            </div>

            <div className="fixed text-[50px] bottom-10 right-4 md:bottom-20 md:right-10 z-30">
                <button className="" onClick={handleSrollToPayment}>
                    <AiFillDownSquare />
                </button>
            </div>
        </section>
    );
}
