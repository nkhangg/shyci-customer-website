'use client';
import { Button } from '@/components';
import { links } from '@/contans/routes';
import { customerService } from '@/data/common/data';
import Link from 'next/link';
import React from 'react';

export interface IErroBoundaryProps {
    error: Error;
}

export default function ErroBoundary({ error }: IErroBoundaryProps) {
    return (
        <section className="">
            <div className="w-full h-conlection-home relative overflow-hidden max-w-full">
                <div className=" py-5 text-[1rem] h-full font-medium w-full flex flex-col items-center justify-center gap-4">
                    <span className="text-2xl">Opps</span>
                    <p>Có chuyện gì đó đã xảy ra</p>
                    <p className="text-sm">Nếu điều này vẫn tiếp tục xảy ra. Hãy liên hệ với chúng tôi: {customerService.title}</p>

                    <Link href={links.home} className="w-1/4">
                        <Button title="Quay lại trang home" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
