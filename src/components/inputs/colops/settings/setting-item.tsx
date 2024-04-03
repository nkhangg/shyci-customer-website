'use client';
import styles from './styles.module.css';
import { AiOutlineRight } from '@meronex/icons/ai';
import classNames from 'classnames';

import React, { DetailedHTMLProps, MouseEvent, ReactNode } from 'react';

export interface ISettingItemProps extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title: string;
    data?: string | null;
    options?: {
        showIcon?: boolean;
    };
}

export default function SettingItem({ title, data, options = { showIcon: true }, ...props }: ISettingItemProps) {
    return (
        <div
            {...props}
            onClick={options.showIcon ? props.onClick : undefined}
            className={classNames('flex flex-col gap-2 relative py-2', {
                [styles['setting']]: options.showIcon,
                ['cursor-pointer']: options.showIcon,
            })}
        >
            <h4 className="text-[15px] font-medium capitalize">{title}</h4>
            {data !== undefined && <span className="text-[13px] normal-case font-medium">{data || 'Chưa cập nhật'}</span>}

            {options.showIcon && (
                <div
                    className={classNames(' absolute top-0 bottom-0 right-0 flex items-center justify-center text-[16px] hover:text-violet-primary cursor-pointer', {
                        [styles['setting-item']]: options.showIcon,
                    })}
                >
                    <AiOutlineRight />
                </div>
            )}
        </div>
    );
}
