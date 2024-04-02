import { Header } from '@/components';
import Initial from '@/components/common/providers/contexts/initial-context';
import Provider from '@/components/common/providers/provider';

import React, { ReactNode, Suspense } from 'react';

export interface IPrimaryLayoutProps {
    children: ReactNode;
}

export default function PrimaryLayout({ children }: IPrimaryLayoutProps) {
    return (
        <Provider>
            <Initial>
                <Suspense>{children}</Suspense>
            </Initial>
        </Provider>
    );
}
