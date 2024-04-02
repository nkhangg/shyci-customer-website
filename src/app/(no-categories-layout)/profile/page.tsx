'use client';
import { Button } from '@/components';
import { InitialContext } from '@/components/common/providers/contexts/initial-context';
import { links } from '@/contans/routes';
import appService from '@/ultils/services/app-service';
import { redirect, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useLayoutEffect } from 'react';

export interface IProfilePageProps {}

export default function ProfilePage(props: IProfilePageProps) {
    const { user, isFetched, refetch } = useContext(InitialContext);

    const router = useRouter();

    useLayoutEffect(() => {
        if (!isFetched) {
            return;
        }

        if (!user) {
            redirect(links.auth.login);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isFetched]);

    const handleLogout = async () => {
        await appService.handleLogout();

        requestIdleCallback(() => {
            if (refetch) {
                refetch();
            }
        });

        router.push(links.home);
    };

    return (
        <div>
            <Button onClick={handleLogout} title="Đăng xuất" />
        </div>
    );
}
