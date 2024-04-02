'use client';
import { NotFound, PrimaryLoading, Product } from '@/components';
import { useGetProducts } from '@/hooks';
import { useQueryState } from 'nuqs';
import React, { Suspense, useEffect } from 'react';

export interface IProductsPageProps {}

export default function ProductsPage(props: IProductsPageProps) {
    const [name] = useQueryState('id');

    const { data, lastPostRef, isFetching, isLoading, isFetched } = useGetProducts({ queries: { categories: Number(name) || 0 } });

    return (
        <Suspense>
            <section>
                <div className="px-primary grid grid-cols-2 lg:grid-cols-4 gap-y-8 mb-[4%] gap-4">
                    {data?.length > 0 &&
                        data.map((item) => {
                            return (
                                <div ref={lastPostRef} className="w-full" key={item.id}>
                                    <Product data={item} />
                                </div>
                            );
                        })}
                </div>

                {(isLoading || isFetching) && (
                    <div className="flex items-center justify-center">
                        <PrimaryLoading />
                    </div>
                )}

                {(!data || data.length <= 0) && isFetched && <NotFound />}
            </section>
        </Suspense>
    );
}
