'use client';
import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import Button from '../button';
import { auth } from '@/ultils/services/firebase/config';
import { useRouter } from 'next/navigation';
import { links } from '@/contans/routes';
import { loginGoogle } from '@/apis/handlers/auth';
import { messages } from '@/ultils/constants';
import { keysLocalStorage } from '@/ultils/local-storege';

export interface IButtonGoogleProps {
    setLoading?: (v: boolean) => void;
    setAlert?: (value: string) => void;
    refetch?: () => void;
}

export default function ButtonGoogle({ setLoading, setAlert, refetch }: IButtonGoogleProps) {
    const router = useRouter();
    const [signInWithGoogle, user, loading] = useSignInWithGoogle(auth);

    const handleLogin = async () => {
        if (!user || !user.user.email) return;
        try {
            if (setLoading) {
                setLoading(true);
            }
            const response = await loginGoogle(user?.user.uid, user?.user.email);

            if (!response || response.code !== 201) {
                router.push(links.auth.registergg(user.user.uid));
                return;
            }

            localStorage.setItem(keysLocalStorage.token, response.data.token);
            localStorage.setItem(keysLocalStorage.refresh, response.data.refreshToken);

            if (refetch) {
                refetch();
            }

            router.back();
        } catch (error) {
            console.log(error);
            if (setAlert) {
                setAlert(messages.errors.handle);
            }
        } finally {
            if (setLoading) {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        if (!user || loading) return;

        handleLogin();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, loading]);
    return (
        <div className="py-8 mt-8  border-t">
            <Button type="button" onClick={() => signInWithGoogle()} title="Đăng nhập với Google" />
        </div>
    );
}
