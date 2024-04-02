'use client';
import React, { useCallback, useRef } from 'react';
import { IDProduct, IFilterProduct } from '../../interface';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getProducts } from '@/apis/handlers/products';
import { useDebounce } from '.';

export interface IuseGetProductsProps {
    queries?: IFilterProduct;
}

export default function useGetProducts({ queries }: IuseGetProductsProps) {
    const currentPage = useRef<number>(1);
    const totalPages = useRef<number>(1);
    const totalItems = useRef<number>(0);

    const searchD = useDebounce(queries?.search || '', 0);

    const { data, isLoading, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage, refetch, ...prev } = useInfiniteQuery({
        queryKey: ['useGetProducts', { ...queries, search: searchD }],
        queryFn: ({ pageParam = 1 }) => {
            return getProducts({ page: pageParam, ...queries, search: searchD });
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            currentPage.current = lastPage?.meta.currentPage || 1;
            totalPages.current = lastPage?.meta.totalPages || 1;
            totalItems.current = lastPage?.meta.totalItems || 0;
            return (lastPage?.meta.currentPage || 1) >= (lastPage?.meta.totalPages || 1) ? undefined : allPages.length + 1;
        },
    });

    const result: IDProduct[] = data?.pages.reduce((item: any, cur) => {
        if (item && cur?.items && cur.items.length) {
            return item.concat(cur.items);
        }
    }, []);

    const intObserver: any = useRef();
    const lastPostRef = useCallback(
        (post: any) => {
            if (isFetchingNextPage) return;

            if (intObserver.current) intObserver.current.disconnect();

            intObserver.current = new IntersectionObserver((posts) => {
                if (posts[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            });

            if (post) intObserver.current.observe(post);
        },
        [fetchNextPage, hasNextPage, isFetchingNextPage],
    );

    return {
        data: result,
        isLoading,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        currentPage: currentPage.current,
        totalPages: totalPages.current,
        totalItems: totalItems.current,
        refetch,
        fetchNextPage,
        lastPostRef,
        ...prev,
    };
}
