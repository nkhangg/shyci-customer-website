'use client';
import { login, registerCustomer } from '@/apis/handlers/auth';
import { Button } from '@/components';
import FullpageLoading from '@/components/common/loadings/full-page-loading';
import { InitialContext } from '@/components/common/providers/contexts/initial-context';
import Input from '@/components/inputs/input';
import { links } from '@/contans/routes';
import { messages } from '@/ultils/constants';
import { keysLocalStorage } from '@/ultils/local-storege';
import Validate from '@/ultils/validate';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export interface RegisterPageProps {}

export default function RegisterPage(props: RegisterPageProps) {
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
            password: '',
            email: '',
            comfirmPassword: '',
        },
    });

    const prevValidate = (value: { username: string; password: string; email: string; comfirmPassword: string }) => {
        const reuslt: boolean[] = [];
        if (value.password !== value.comfirmPassword) {
            setError('comfirmPassword', { message: 'Xác nhận mật khẩu không chính xác' });
            reuslt.push(true);
        }

        if (!Validate.isEmail(value.email)) {
            setError('email', { message: 'Email không hợp lệ' });
            reuslt.push(true);
        }

        return reuslt.length > 0;
    };

    const handleRegister = async (value: { username: string; password: string; email: string; comfirmPassword: string }) => {
        if (prevValidate(value)) return;

        try {
            setLoading(true);
            const response = await registerCustomer({ ...value });

            if (!response || response.code !== 201) {
                if (response?.errors) {
                    Object.keys(response.errors).forEach((item) => {
                        const key = item as 'username' | 'password' | 'email';

                        setError(item as 'username' | 'password' | 'email', { message: response?.errors && response.errors[key] });
                    });
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
                    <Input
                        {...register('email', {
                            required: 'Không được bỏ trống email',
                        })}
                        message={errors.email?.message}
                        label="Email"
                        type="text"
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
                    <Input
                        {...register('comfirmPassword', {
                            required: 'Bạn chưa nhập mật khẩu',
                            minLength: {
                                value: 6,
                                message: 'Mật khẩu không ngắn hơn 6 kí tự',
                            },
                        })}
                        message={errors.comfirmPassword?.message}
                        label="Nhập lại mật khẩu"
                        type="password"
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

                <div className="py-8 mt-8  border-t">
                    <Button title="Đăng nhập với Google" />
                </div>
            </form>

            {loading && <FullpageLoading />}
        </section>
    );
}
