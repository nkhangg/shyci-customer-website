import Image from 'next/image';
import React from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { links } from '@/contans/routes';
import { IDProduct } from '../../../interface';
import { calaculateDiscount, toCurrency } from '@/ultils/funtions';
export interface IProductProps {
    data: IDProduct;
}

export default function Product({ data }: IProductProps) {
    return (
        <Link href={links.products.detail(data.id, data.name)}>
            <div className="w-full flex flex-col gap-2">
                <figure
                    className={classNames('relative w-full aspect-[7/8]', {
                        [styles['product']]: true,
                    })}
                >
                    <Image fill style={{ objectFit: 'cover' }} src={data.images[0]?.name} alt={data.images[0]?.name} />
                    {data.images.length >= 2 && (
                        <Image
                            className={classNames('relative w-full opacity-0 transition-all ease-linear duration-200', {
                                [styles['product-image']]: true,
                            })}
                            fill
                            style={{ objectFit: 'cover' }}
                            src={data.images[1]?.name}
                            alt={data.images[1]?.name}
                        />
                    )}
                </figure>

                <div className="text-[.9rem] font-medium flex flex-col gap-1">
                    <h2 className="a-text">{data.name}</h2>
                    <div className="px-[10px] flex items-center gap-2">
                        <span>{toCurrency(calaculateDiscount(data?.sizes[0]?.price, data?.sizes[0]?.discount))}</span>
                        <span>{data?.sizes[0]?.discount}%</span>
                    </div>
                    <del className="px-[10px]">{toCurrency(data?.sizes[0]?.price)}</del>
                </div>
            </div>
        </Link>
    );
}
