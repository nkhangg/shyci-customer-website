import classNames from 'classnames';
import React, { DetailedHTMLProps } from 'react';
import { ISize } from '../../../interface';

export interface ISizeButtonProps extends DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    data: ISize;
    active?: boolean;
}

export default function SizeButton({ data, active, ...props }: ISizeButtonProps) {
    return (
        <button
            {...props}
            className={classNames('w-[38px] aspect-square border-primary text-sm p-1', {
                [props.className || '']: !!props.className,
                ['border-2']: active,
                ['border border-dashed']: !active,
            })}
        >
            <span className="uppercase font-medium">{data.name}</span>
        </button>
    );
}
