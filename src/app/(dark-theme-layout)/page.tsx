'use client';
import { Conlection, NotFound, PrimaryLoading } from '@/components';
import useGetCollection from '@/hooks/useGetConllection';
import Image from 'next/image';

export default function Home() {
    const { data, isFetched, isLoading, isFetching, lastPostRef } = useGetCollection();

    return (
        <main className="py-header">
            {data?.length > 0 &&
                data.map((item) => {
                    return (
                        <div className="w-full h-full" key={item.id} ref={lastPostRef}>
                            <Conlection key={item.image} data={item} />
                        </div>
                    );
                })}

            {(isLoading || isFetching) && (
                <div className="flex min-h-screen items-center justify-center">
                    <PrimaryLoading />
                </div>
            )}

            {(!data || data.length <= 0) && isFetched && <NotFound />}
        </main>
    );
}
