import React, { ReactNode } from 'react';

export interface IComfirmUIDefaultProps {
    title: string;
    description?: string;
    children?: ReactNode;
    onClose?: () => void;
    onOk?: () => void;
    options?: {
        cancelName?: string;
        okeName?: string;
        closeWhenSubmit?: boolean;
    };
    showCloseBtn?: boolean;
}

export default function ComfirmUIDefault({
    title,
    description,
    children,
    options = { cancelName: 'Không', okeName: 'Ok', closeWhenSubmit: true },
    showCloseBtn = true,
    onClose,
    onOk,
}: IComfirmUIDefaultProps) {
    return (
        <div className="shadow-xl rounded-lg p-4 flex flex-col justify-between bg-white gap-4 ">
            <div className="flex flex-col gap-2">
                <h1 className="text-[16px] font-medium">{title}</h1>
                {description && <p className="normal-case text-sm font-medium">{description}</p>}
            </div>

            {children}
            <div className="flex items-center justify-end gap-4">
                {showCloseBtn && (
                    <button
                        onClick={() => {
                            if (!onClose) return;
                            onClose();
                        }}
                        className="py-2 px-4 rounded-md bg-[#333] text-white"
                    >
                        {options.cancelName}
                    </button>
                )}
                <button
                    type="submit"
                    className="py-2 px-4 rounded-md hover:bg-[#333] hover:text-white transition-all ease-linear"
                    onClick={() => {
                        if (onOk) {
                            onOk();
                        }
                        if (!onClose || !options.closeWhenSubmit) return;
                        onClose();
                    }}
                >
                    {options.okeName}
                </button>
            </div>
        </div>
    );
}
