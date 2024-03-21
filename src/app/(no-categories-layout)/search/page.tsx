import { Product } from '@/components';
import Input from '@/components/inputs/input';
import { AiOutlineSearch } from '@meronex/icons/ai';
import React from 'react';

export interface ISearchProps {}

export default function Search(props: ISearchProps) {
    return (
        <section className="flex items-center justify-center py-spacing-contaner flex-col px-primary">
            <div className="w-full md:w-[400px] flex items-center gap-2">
                <div className="flex-1 w-full">
                    <Input classNames={{ input: 'text-lg' }} />
                </div>

                <div className="text-2xl flex items-center justify-center">
                    <AiOutlineSearch />
                </div>
            </div>
            <div className="my-8 w-full flex items-center justify-start">
                <span className="text-left">Tìm thấy 1000 kết quả</span>
            </div>
            <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 py-8 gap-2">
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
            </div>
        </section>
    );
}
