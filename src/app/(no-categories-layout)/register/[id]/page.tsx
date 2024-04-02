'use client';
import { registerGoogleCustomer } from '@/apis/handlers/auth';
import { Button } from '@/components';
import FullpageLoading from '@/components/common/loadings/full-page-loading';
import { InitialContext } from '@/components/common/providers/contexts/initial-context';
import Input from '@/components/inputs/input';
import { links } from '@/contans/routes';
import { messages } from '@/ultils/constants';
import { keysLocalStorage } from '@/ultils/local-storege';
import appService from '@/ultils/services/app-service';
import { auth } from '@/ultils/services/firebase/config';
import { getAuth } from 'firebase/auth';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';

export interface IRegisterGoogleProps {
    params: { id: string };
}

export default function RegisterGoogle({ params }: IRegisterGoogleProps) {
    const [currentUser, isLoading] = useAuthState(auth);

    const [alert, setAlert] = useState<string | null>(null);

    const { user, isFetched, refetch } = useContext(InitialContext);

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: '',
        },
    });

    const handleRegister = async (value: { username: string }) => {
        if (!currentUser?.email) {
            setAlert(messages.errors.handle);
            return;
        }
        try {
            setLoading(true);
            const response = await registerGoogleCustomer(params.id, { username: value.username, email: currentUser?.email });

            if (!response || response.code !== 201) {
                if (response?.errors) {
                    setError('username', { message: response.errors.username });
                } else {
                    setAlert('Tài khoản hoặc mật khẩu không chính xác');
                }
                return;
            }

            localStorage.setItem(keysLocalStorage.token, response.data.token);
            localStorage.setItem(keysLocalStorage.refresh, response.data.refreshToken);

            if (refetch) {
                refetch();
            }

            router.back();
        } catch (error) {
            setAlert(messages.errors.handle);
        } finally {
            setLoading(false);
        }
    };

    useLayoutEffect(() => {
        if (!isFetched || isLoading) return;

        if (user || !currentUser) {
            redirect(links.home);
        }
    }, [user, isFetched, currentUser, isLoading]);

    useLayoutEffect(() => {
        if (!params.id || !currentUser) return;

        if (currentUser.uid !== params.id) appService.handleLogout();
    }, [params.id, currentUser]);

    return (
        <section className="flex items-center justify-center py-spacing-contaner">
            <form onSubmit={handleSubmit(handleRegister)} className="w-full px-primary md:w-[600px]">
                <h1 className="a-text-non-hover text-center text-[15px] font-medium">Đăng Ký</h1>

                <div className="py-2 my-8 flex flex-col justify-center gap-8">
                    <Input
                        {...register('username', {
                            required: 'Không được bỏ trống trên đăng nhập',
                        })}
                        message={errors.username?.message}
                        label="Tên đăng nhập"
                    />

                    {alert && (
                        <div className="w-full rounded-lg border-heart border py-2 flex items-center justify-center text-heart">
                            <span>{alert}</span>
                        </div>
                    )}

                    <div className="flex items-center justify-center w-full">
                        <Button type="submit" title="Đăng ký" border={'border-2'} />
                    </div>
                </div>

                <div className="">
                    Bạn đã có tài khoản ?{' '}
                    <Link className="a-text" href={links.auth.login}>
                        Đăng nhập
                    </Link>
                </div>
            </form>

            {loading && <FullpageLoading />}
        </section>
    );
}
