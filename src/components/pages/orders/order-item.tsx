'use client';
import { calaculateDiscount, toCurrency } from '@/ultils/funtions';
import { AiOutlineInfoCircle } from '@meronex/icons/ai';
import Tippy from '@tippyjs/react';
import moment from 'moment';
import React, { forwardRef, useMemo, useState } from 'react';
import { IDOrder } from '../../../../interface';
import Link from 'next/link';
import { links } from '@/contans/routes';

export interface IOrderItemProps {
    data: IDOrder;
    options?: {
        showSeeall?: boolean;
    };
}

const OrderItem = forwardRef(({ data, options = { showSeeall: true } }: IOrderItemProps, ref: any) => {
    const [seeall, setSeeall] = useState(false);

    const renderTitle = useMemo(() => {
        if (!data.detail) {
            return { title: 'Đơn hàng của bạn đang được chuẩn bị', time: data.createdAt, label: '' };
        }

        if (data.detail.cancel && data.detail.reason) {
            return { title: 'Đơn hàng của bạn đã bị hủy', time: data.detail.createdAt, label: 'đã hủy' };
        }

        if (!data.detail.cancel && !data.detail.payAt) {
            return { title: 'Đơn hàng của bạn đang được chuẩn bị', time: data.detail.createdAt, label: '' };
        }

        return { title: 'Đơn hàng đã xác nhận thanh toán', time: data.detail.payAt, label: 'hoàn thành' };
    }, [data]);

    const renderProduct = useMemo(() => {
        if (!options.showSeeall) return data.data;

        if (!seeall) return data.data.slice(0, 3);

        return data.data;
    }, [data.data, seeall, options.showSeeall]);

    return (
        <div ref={ref} className="flex flex-col">
            <div className="flex items-center justify-between border-b py-2">
                <div className="flex items-center gap-2 ">
                    <span className="text-xs font-medium">{renderTitle?.title}</span>
                    <Tippy content={moment(renderTitle.time).format('DD/MM/YYYY HH:ss')}>
                        <span className="text-[16px]">
                            <AiOutlineInfoCircle />
                        </span>
                    </Tippy>
                </div>
                <span className="text-heart text-xs font-medium">{renderTitle.label}</span>
            </div>

            <div>
                {renderProduct.map((item, index) => {
                    return (
                        <Link href={links.orders.orderDetail(data.uuid)} key={item.id + index} className="py-4 flex items-center gap-4 border-b">
                            <div
                                className="w-[78px] aspect-square rounded"
                                style={{
                                    backgroundImage: `url('${item.size.product?.images[0].name}')`,
                                    backgroundSize: 'cover',
                                }}
                            ></div>

                            <div className="flex-1 w-full max-w-full h-full flex flex-col items-start text-sm gap-1">
                                <h4 className="break-all line-clamp-2 normal-case font-medium">{item.size.product?.name}</h4>
                                <div className="flex items-center justify-between w-full">
                                    <div>
                                        <span className="normal-case">Kích thước: {item.size.name.toUpperCase()}</span>
                                        <p className="text-xs font-medium">x{item.quantity}</p>
                                    </div>
                                    <div className="flex gap-2 ">
                                        {item.discount > 0 && <span className="line-through text-gray-400">{toCurrency(item.price)}</span>}
                                        <span className="text-heart font-medium">{toCurrency(calaculateDiscount(item.price, item.discount))}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}

                {data.data.length > 3 && options.showSeeall && (
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            setSeeall((prev) => !prev);
                        }}
                        className="flex items-center justify-center py-2 hover:underline hover:text-violet-primary font-medium cursor-pointer"
                    >
                        <span className="text-center">{seeall ? 'Thu gọn' : 'Xem tất cả sản phẩm'}</span>
                    </div>
                )}
            </div>
        </div>
    );
});

OrderItem.displayName = 'OrderItem';

export default OrderItem;
