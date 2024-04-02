import * as React from 'react';

export interface INotFoundProps {
    title?: string;
}

export default function NotFound({ title = 'Không tìm thấy sản phẩm' }: INotFoundProps) {
    return (
        <div className="flex items-center justify-center text-lg">
            <h4>{title}</h4>
        </div>
    );
}
