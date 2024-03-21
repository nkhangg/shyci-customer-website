import classNames from 'classnames';
import React, { DetailedHTMLProps } from 'react';

export interface IButtonProps extends DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    title: string;
    border?: string;
}

export default function Button({ title, border, ...props }: IButtonProps) {
    return (
        <button
            {...props}
            className={classNames('w-full text-sm border-primary py-2 text-primary font-medium active:scale-95 transition-all ease-in', {
                ['border']: !border,
                [border || '']: border,
            })}
        >
            <span className="hover:underline">{title}</span>
        </button>
    );
}
