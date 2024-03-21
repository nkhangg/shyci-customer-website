import { Button } from '@/components';
import Input from '@/components/inputs/input';
import { links } from '@/contans/routes';
import Link from 'next/link';
import React from 'react';

export interface ILoginPageProps {}

export default function LoginPage(props: ILoginPageProps) {
    return (
        <section className="flex items-center justify-center py-spacing-contaner">
            <div className="w-full px-primary md:w-[600px]">
                <h1 className="a-text-non-hover text-center text-[15px] font-medium">Đăng Nhập</h1>

                <div className="py-2 my-8 flex flex-col justify-center gap-8">
                    <Input label="Tên đăng nhập hoặc email" />
                    <Input label="Mật khẩu" type="password" />

                    <div className="flex items-center justify-center w-full">
                        <Button title="Đăng nhập" border={'border-2'} />
                    </div>
                </div>

                <div className="">
                    Bạn chưa có tài khoản ?{' '}
                    <Link className="a-text" href={links.auth.register}>
                        Đăng ký
                    </Link>
                </div>

                <div className="py-8 mt-8  border-t">
                    <Button title="Đăng nhập với Google" />
                </div>
            </div>
        </section>
    );
}
