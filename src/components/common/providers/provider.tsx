'use client';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'tippy.js/dist/tippy.css';
import React, { ReactNode, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CartContext from './contexts/cart-context';
export interface IProviderProps {
    children: ReactNode;
}

export default function Provider({ children }: IProviderProps) {
    const [queryClient] = React.useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                    },
                },
            }),
    );

    return (
        <QueryClientProvider client={queryClient}>
            <CartContext>{children}</CartContext>
        </QueryClientProvider>
    );
}
