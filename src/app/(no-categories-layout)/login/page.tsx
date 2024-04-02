'use client';
import { Button, ButtonGoogle } from '@/components';
import Input from '@/components/inputs/input';
import { links } from '@/contans/routes';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import React, { useContext, useEffect, useState } from 'react';
import { messages } from '@/ultils/constants';
import { login } from '@/apis/handlers/auth';
import { keysLocalStorage } from '@/ultils/local-storege';
import { redirect, useRouter } from 'next/navigation';
import { InitialContext } from '@/components/common/providers/contexts/initial-context';
import FullpageLoading from '@/components/common/loadings/full-page-loading';

export interface ILoginPageProps {}

export default function LoginPage(props: ILoginPageProps) {
    const [alert, setAlert] = useState<string | null>(null);

    const { user, isFetched, refetch } = useContext(InitialContext);

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const handleLogin = async (value: { username: string; password: string }) => {
        try {
            setLoading(true);
            const response = await login({ ...value });

            if (!response || response.code !== 201) {
                setAlert('Tài khoản hoặc mật khẩu không chính xác');
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
            setAlert(messages.errors.handle);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isFetched) return;

        if (user) {
            redirect(links.home);
        }
    }, [user, isFetched]);

    return (
        <section className="flex items-center justify-center py-spacing-contaner">
            <form onSubmit={handleSubmit(handleLogin)} className="w-full px-primary md:w-[600px]">
                <h1 className="a-text-non-hover text-center text-[15px] font-medium">Đăng Nhập</h1>

                <div className="py-2 my-8 flex flex-col justify-center gap-8">
                    <Input
                        {...register('username', {
                            required: 'Không được bỏ trống trên đăng nhập',
                        })}
                        message={errors.username?.message}
                        label="Tên đăng nhập"
                    />
                    <Input
                        {...register('password', {
                            required: 'Bạn chưa nhập mật khẩu',
                            minLength: {
                                value: 6,
                                message: 'Mật khẩu không ngắn hơn 6 kí tự',
                            },
                        })}
                        message={errors.password?.message}
                        label="Mật khẩu"
                        type="password"
                    />

                    {alert && (
                        <div className="w-full rounded-lg border-heart border py-2 flex items-center justify-center text-heart">
                            <span>{alert}</span>
                        </div>
                    )}

                    <div className="flex items-center justify-center w-full">
                        <Button title="Đăng nhập" type="submit" border={'border-2'} />
                    </div>
                </div>

                <div className="">
                    Bạn chưa có tài khoản ?{' '}
                    <Link className="a-text" href={links.auth.register}>
                        Đăng ký
                    </Link>
                </div>

                <ButtonGoogle setLoading={setLoading} setAlert={setAlert} refetch={refetch} />
            </form>

            {loading && <FullpageLoading />}
        </section>
    );
}
