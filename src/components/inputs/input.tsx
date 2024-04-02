import cls from 'classnames';
import React, { DetailedHTMLProps, ReactNode, forwardRef } from 'react';

export interface IInputProps extends DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string;
    icon?: ReactNode;
    message?: string;
    flagRequired?: boolean;
    defaultMargin?: boolean;
    classNames?: {
        input?: string;
    };
    rightIcon?: ReactNode;
}

const Input = forwardRef(({ icon, message, label, flagRequired, defaultMargin = true, classNames, rightIcon, ...props }: IInputProps, ref: any) => {
    return (
        <div className="flex flex-col">
            {label && (
                <label htmlFor={props.id} className="a-text-non-hover -ml-[10px] text-sm">
                    <span> {label}</span>
                    {flagRequired && <span className="text-heart ml-1">*</span>}
                </label>
            )}
            <div
                className={cls(' w-full border-b border-black flex items-center relative h-9 overflow-hidden ', {
                    ['border-heart']: !!message,
                    // ['mx-[10px]']: defaultMargin,
                })}
            >
                {icon && <div className="absolute left-4 flex items-center justify-center text-[20px]">{icon}</div>}
                <input
                    autoComplete="off"
                    ref={ref}
                    {...props}
                    className={cls('outline-none w-full h-full ', {
                        ['pl-14']: !!icon,
                        ['pl-0']: !icon,
                        [classNames?.input || '']: !!classNames?.input,
                        ['text-[15px]']: !classNames?.input,
                    })}
                />

                {rightIcon && <div className="absolute top-0 bottom-0 flex items-center right-0 p-2 text-md">{rightIcon}</div>}
            </div>
            {message && <small className="mt-1 text-heart font-medium pl-1">{message}</small>}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
