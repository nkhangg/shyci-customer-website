'use client';
import { NotFound, PrimaryLoading, Product } from '@/components';
import Input from '@/components/inputs/input';
import { useGetProducts } from '@/hooks';
import { AiOutlineSearch } from '@meronex/icons/ai';
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { IFilterProduct } from '../../../../interface';

export interface ISearchProps {}

export default function Search(props: ISearchProps) {
    const refInput = useRef<HTMLInputElement>(null);
    const [filters, setFilters] = useState<IFilterProduct>({});

    const { data, isLoading, isFetched, isFetching, totalItems, lastPostRef } = useGetProducts({ queries: filters });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!refInput.current) return;
        setFilters({ ...filters, search: refInput.current.value });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value.length) {
            setFilters({});
        }
    };

    return (
        <section className="flex items-center justify-center py-spacing-contaner flex-col px-primary">
            <div className="w-full md:w-[400px] flex items-center gap-2">
                <form onSubmit={handleSubmit} className="flex-1 w-full">
                    <Input onChange={handleChange} ref={refInput} classNames={{ input: 'text-lg' }} />
                </form>

                <div className="text-2xl flex items-center justify-center cursor-pointer" onClick={handleSubmit}>
                    <AiOutlineSearch />
                </div>
            </div>
            <div className="my-8 w-full flex items-center justify-start">
                <span className="text-left">Tìm thấy {totalItems} kết quả</span>
            </div>
            {data && (
                <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 py-8 gap-2">
                    {data.length > 0 &&
                        isFetched &&
                        data.map((item) => {
                            return (
                                <div ref={lastPostRef} className="w-full" key={item.id}>
                                    <Product data={item} />
                                </div>
                            );
                        })}
                </div>
            )}

            {((!data && isFetched) || (isFetched && data.length <= 0)) && <NotFound />}

            {(isLoading || isFetching) && <PrimaryLoading />}
        </section>
    );
}
