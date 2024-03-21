import { Button } from '@/components';
import Input from '@/components/inputs/input';
import { links } from '@/contans/routes';
import Link from 'next/link';
import React from 'react';

export interface RegisterPageProps {}

export default function RegisterPage(props: RegisterPageProps) {
    return (
        <section className="flex items-center justify-center py-spacing-contaner">
            <div className="w-full px-primary md:w-[600px]">
                <h1 className="a-text-non-hover text-center text-[15px] font-medium">Đăng Ký</h1>

                <div className="py-2 my-8 flex flex-col justify-center gap-8">
                    <Input label="Tên đăng nhập" />
                    <Input label="Email" type="email" />
                    <Input label="Mật khẩu" type="password" />
                    <Input label="Nhập lại mật khẩu" type="password" />

                    <div className="flex items-center justify-center w-full">
                        <Button title="Đăng ký" border={'border-2'} />
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
            </div>
        </section>
    );
}
