import classNames from 'classnames';
import React, { DetailedHTMLProps, ReactNode, forwardRef } from 'react';

export interface ITextAreaProps extends DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    label?: string;
    icon?: ReactNode;
    message?: string;
    flagRequired?: boolean;
}

const TextArea = forwardRef(({ icon, message, label, flagRequired, ...props }: ITextAreaProps, ref: any) => {
    return (
        <div className="flex flex-col">
            {label && (
                <label htmlFor={props.id} className="mb-2 pl-1 text-ancesst1 text-[1rem]">
                    <span> {label}</span>
                    {flagRequired && <span className="text-heart ml-1">*</span>}
                </label>
            )}
            <div
                className={classNames('w-full border border-ancesst5 rounded-md flex items-center relative focus-within:border-ancesst0 overflow-hidden transition-all ease-out', {
                    ['border-heart']: !!message,
                })}
            >
                {icon && <div className="absolute left-4 flex items-center justify-center text-[20px]">{icon}</div>}
                <textarea
                    ref={ref}
                    rows={props.rows || 6}
                    className={classNames('outline-none w-full h-full p-4 text-sm resize-none', {
                        ['pl-14']: !!icon,
                        ['pl-4']: !icon,
                    })}
                    {...props}
                />
            </div>
            {message && <small className="mt-1 text-heart font-medium pl-1">{message}</small>}
        </div>
    );
});

TextArea.displayName = 'TextArea';

export default TextArea;
