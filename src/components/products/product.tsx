/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';
export interface IProductProps {}

export default function Product(props: IProductProps) {
    return (
        <div className="w-full flex flex-col gap-2">
            <figure
                className={classNames('relative w-full aspect-[7/8]', {
                    [styles['product']]: true,
                })}
            >
                <img
                    style={{ objectFit: 'cover' }}
                    className="absolute"
                    src={'https://lostmanagementcities.com/web/product/medium/202311/ba86b20d742ad0d6cc0d21b27713abd6.jpg'}
                    alt="https://lostmanagementcities.com/web/product/medium/202311/ba86b20d742ad0d6cc0d21b27713abd6.jpg"
                />
                <img
                    className={classNames('absolute w-full opacity-0 transition-all ease-linear duration-200', {
                        [styles['product-image']]: true,
                    })}
                    style={{ objectFit: 'cover' }}
                    src={'https://lostmanagementcities.com/web/product/small/202311/2cc23774df41ec468a6a542b24574d5c.jpg'}
                    alt="https://lostmanagementcities.com/web/product/small/202311/2cc23774df41ec468a6a542b24574d5c.jpg"
                />
            </figure>

            <div className="text-[.9rem] font-medium flex flex-col gap-1">
                <h2 className="a-text">LMC X AVIREX LEATHER MOTOR JACKET Black</h2>
                <div className="px-[10px] flex items-center gap-2">
                    <span>200.000 VND</span>
                    <span>30%</span>
                </div>
                <del className="px-[10px]">260.000 VND</del>
            </div>
        </div>
    );
}
