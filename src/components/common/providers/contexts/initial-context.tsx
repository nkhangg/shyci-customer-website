'use client';
import { keysLocalStorage } from '@/ultils/local-storege';
import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { IUser } from '../../../../../interface';
import { useQuery } from '@tanstack/react-query';
import { profilePoper } from '@/apis/handlers/auth';

export interface IInitialProps {
    children: ReactNode;
}

export interface InitialContextProps {
    user: null | IUser;
    isLoading?: boolean;
    isFetched?: boolean;
    isFetching?: boolean;
    refetch?: () => void;
}

export const InitialContext = createContext<InitialContextProps>({ user: null });

export default function Initial({ children }: IInitialProps) {
    const { data, isLoading, isFetched, isFetching, refetch } = useQuery({
        queryKey: ['get-current-user'],
        queryFn: profilePoper,
    });

    return (
        <InitialContext.Provider
            value={{
                user: data?.data || null,
                isLoading,
                isFetched,
                isFetching,
                refetch,
            }}
        >
            {children}
        </InitialContext.Provider>
    );
}
