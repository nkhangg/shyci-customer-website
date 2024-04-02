import { collections } from '@/apis/handlers/collections';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useCallback, useRef } from 'react';
import { IRowCollection } from '../../interface';

export default function useGetCollection() {
    const currentPage = useRef<number>(1);
    const totalPages = useRef<number>(1);

    const { data, isLoading, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage, refetch, ...prev } = useInfiniteQuery({
        queryKey: ['useGetCollection'],
        queryFn: ({ pageParam = 1 }) => {
            return collections(pageParam);
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            currentPage.current = lastPage?.data?.meta.currentPage || 1;
            totalPages.current = lastPage?.data?.meta.totalPages || 1;

            return (lastPage?.data.meta.currentPage || 1) >= (lastPage?.data.meta.totalPages || 1) ? undefined : allPages.length + 1;
        },
    });

    const result: IRowCollection[] = data?.pages.reduce((item: any, cur) => {
        if (item && cur?.data.items && cur.data.items.length) {
            return item.concat(cur.data.items);
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
        refetch,
        fetchNextPage,
        lastPostRef,
        ...prev,
    };
}
