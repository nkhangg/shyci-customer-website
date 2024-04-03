'use client';
import { AiOutlineInbox } from '@meronex/icons/ai';
import React from 'react';
import OrderItem from '../orders/order-item';
import { NotFound, PrimaryLoading } from '@/components';
import { useGetOrders } from '@/hooks';

export interface IOrderInfoProps {}

export default function OrderInfo(props: IOrderInfoProps) {
    const { data, isLoading, isFetching, lastPostRef } = useGetOrders({});

    return (
        <div className="flex flex-col w-full md:w-[640px] border shadow-lg rounded p-5 gap-5">
            <div className="flex items-center gap-4 text-[16px] font-medium">
                <span className="text-lg">
                    <AiOutlineInbox />
                </span>
                <h2>Thông tin đơn hàng</h2>
            </div>

            {data && data.length > 0 && !isLoading && (
                <div className="flex flex-col gap-8">
                    {data?.map((item) => {
                        return <OrderItem data={item} key={item.id} ref={lastPostRef} />;
                    })}
                </div>
            )}

            {(!data || (data && data.length <= 0)) && <NotFound size="small" title="Bạn chưa có đơn hàng nào" />}

            {(isLoading || isFetching) && (
                <div className="flex items-center justify-center">
                    <PrimaryLoading />
                </div>
            )}
        </div>
    );
}
