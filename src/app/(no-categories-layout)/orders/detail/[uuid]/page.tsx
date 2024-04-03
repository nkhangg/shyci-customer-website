'use client';
import { getOrder } from '@/apis/handlers/orders';
import { NotFound, OrderItem } from '@/components';
import FullpageLoading from '@/components/common/loadings/full-page-loading';
import { InitialContext } from '@/components/common/providers/contexts/initial-context';
import { links } from '@/contans/routes';
import { buildAddressOrder, toCurrency } from '@/ultils/funtions';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useContext, useLayoutEffect, useMemo } from 'react';

export interface IOrderDetailPageProps {
    params: { uuid: string };
}

export default function OrderDetailPage({ params }: IOrderDetailPageProps) {
    const { uuid } = params;

    const { user, isFetched } = useContext(InitialContext);

    const { data, isLoading } = useQuery({
        queryKey: ['get-order', uuid],
        queryFn: () => getOrder(uuid),
    });

    const dataMemo = useMemo(() => {
        if (!data?.data) return null;

        return data.data;
    }, [data]);

    const total = useMemo(() => {
        if (!dataMemo) return 0;

        const result = dataMemo.data.reduce((cur, value) => {
            cur += value.price * value.quantity * (1 - value.discount / 100);

            return cur;
        }, 0);

        return result;
    }, [dataMemo]);

    const sumQuantity = useMemo(() => {
        if (!dataMemo) return 0;

        const result = dataMemo.data.reduce((cur, value) => {
            cur += value.quantity;

            return cur;
        }, 0);

        return result;
    }, [dataMemo]);

    useLayoutEffect(() => {
        if (!isFetched) return;

        if (!user) {
            redirect(links.auth.login);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isFetched]);

    return (
        <section className="max-w-[800px] md:max-w-[1320px] w-full p-4 m-auto">
            {dataMemo && data?.code === 200 && (
                <div className="flex-col flex gap-8">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-lg font-semibold">Thông tin đơn hàng</h1>

                        <div className="text-sm normal-case font-medium flex flex-col gap-1">
                            <span className="flex items-center gap-2">
                                <p className="text-gray-600">Mã đơn hàng:</p> #{dataMemo.id}
                            </span>
                            <span className="flex items-center gap-2">
                                <p className="text-gray-600">Tên người nhận:</p> {dataMemo.fullname}
                            </span>
                            <span className="flex items-center gap-2">
                                <p className="text-gray-600">Email người nhận:</p> {dataMemo.email}
                            </span>
                            <span className="flex items-center gap-2">
                                <p className="text-gray-600">Số điện thoại:</p> {dataMemo.phone}
                            </span>
                            <span className="flex items-center gap-2">
                                <p className="text-gray-600">Địa chỉ nhận hàng:</p> {buildAddressOrder(dataMemo)}
                            </span>
                            <span className="flex items-center gap-2">
                                <p className="text-gray-600">Đặt ngày:</p> {moment(dataMemo.createdAt).format('DD/MM/YYYY HH:ss')}
                            </span>
                            {dataMemo.detail?.reason && (
                                <span className="flex items-center gap-2">
                                    <p className="text-gray-600">Lý do:</p> {dataMemo.detail.reason}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="mb-8">
                        <OrderItem options={{ showSeeall: false }} data={dataMemo} />

                        <div className="border-t border-b-2 border-primary py-4 text-sm">
                            <table className="w-full mb-4 border-spacing-0 border-[#ececec]">
                                <tfoot>
                                    <tr className="order-total">
                                        <th align="left" className=" px-2">
                                            Tổng số lượng
                                        </th>
                                        <td align="right">
                                            <strong>
                                                <span className="px-2">
                                                    <bdi>x{sumQuantity}</bdi>
                                                </span>
                                            </strong>{' '}
                                        </td>
                                    </tr>

                                    <tr>
                                        <th align="left" className=" px-2">
                                            Tạm tính
                                        </th>
                                        <td align="right" className="py-2 px-2">
                                            <span className="">{toCurrency(total)}</span>
                                        </td>
                                    </tr>

                                    <tr className="order-total">
                                        <th align="left" className=" px-2">
                                            Tổng
                                        </th>
                                        <td align="right">
                                            <strong>
                                                <span className="px-2">
                                                    <bdi>{toCurrency(total)}</bdi>
                                                </span>
                                            </strong>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {!isLoading && data?.code !== 200 && (
                <div className="h-[80vh] flex justify-center items-center flex-col">
                    <NotFound title="Không tìm thấy dữ liệu" />
                    <Link href={links.auth.profile} className="text-violet-primary hover:underline">
                        Quay lại
                    </Link>
                </div>
            )}

            {isLoading && <FullpageLoading />}
        </section>
    );
}
