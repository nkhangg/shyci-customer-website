import { Product } from '@/components';
import Image from 'next/image';
import React from 'react';

export interface IProductsPageProps {}

export default function ProductsPage(props: IProductsPageProps) {
    return (
        <div className="px-primary grid grid-cols-4 gap-y-8">
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
        </div>
    );
}
