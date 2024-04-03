import React from 'react';
import { IComfirmUIDefaultProps } from './comfirm-default';

export interface IComfirmUiSingleInputProps extends IComfirmUIDefaultProps {}

export default function ComfirmUiSingleInput({ title, description, children, options = { cancelName: 'Không', okeName: 'Ok' }, onClose, onOk }: IComfirmUiSingleInputProps) {
    return (
        <div className="shadow-xl rounded-lg p-4 flex flex-col justify-between bg-white gap-4 ">
            <div className="flex flex-col gap-2">
                <h1 className="text-[16px] font-medium">{title}</h1>
                {description && <p className="normal-case text-sm font-medium">{description}</p>}
            </div>

            {children}
            <div className="flex items-center justify-end gap-4">
                <button
                    onClick={() => {
                        if (!onClose) return;
                        onClose();
                    }}
                    className="py-2 px-4 rounded-md bg-[#333] text-white"
                >
                    {options.cancelName}
                </button>
                <button
                    className="py-2 px-4 rounded-md hover:bg-[#333] hover:text-white transition-all ease-linear"
                    onClick={() => {
                        if (onOk) {
                            onOk();
                        }
                        if (!onClose) return;
                        onClose();
                    }}
                >
                    {options.okeName}
                </button>
            </div>
        </div>
    );
}
