import * as React from 'react';
import PrimaryLoading from './primary-loading';

export interface IFullpageLoadingProps {}

export default function FullpageLoading(props: IFullpageLoadingProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,.4)] z-50">
            <PrimaryLoading />
        </div>
    );
}
