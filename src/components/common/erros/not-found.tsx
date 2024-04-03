import classNames from 'classnames';
import * as React from 'react';

export interface INotFoundProps {
    title?: string;
    size?: 'small' | 'lagre';
}

export default function NotFound({ title = 'Không tìm thấy sản phẩm', size = 'lagre' }: INotFoundProps) {
    return (
        <div
            className={classNames('flex items-center justify-center', {
                ['text-lg']: size === 'lagre',
                ['text-sm']: size === 'small',
            })}
        >
            <h4>{title}</h4>
        </div>
    );
}
