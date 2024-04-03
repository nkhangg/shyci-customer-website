import { getCategories } from '@/apis/handlers/categories';
import { getProducts } from '@/apis/handlers/products';
import { useQueries } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { IDProduct, IDropdownData } from '../../interface';

export default function useGetCategories() {
    const [categories, products] = useQueries({
        queries: [
            {
                queryKey: ['get-categories'],
                queryFn: () => getCategories(),
            },
            {
                queryKey: ['get-product'],
                queryFn: () => getProducts({ limit: 3 }),
            },
        ],
    });

    const dataMemoCategories = useMemo(() => {
        if (!categories || !categories.data) return [];

        return categories.data.data as IDropdownData<any>[];
    }, [categories]);

    const dataMemoProducts = useMemo(() => {
        if (!products || !products.data) return [];

        return products.data.items as IDProduct[];
    }, [products]);

    return {
        dataMemoCategories,
        dataMemoProducts,
    };
}
