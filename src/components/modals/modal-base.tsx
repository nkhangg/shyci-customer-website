'use client';
import React, { ReactNode } from 'react';

export interface IModalBaseProps {
    children?: ReactNode;
    open?: boolean;
    setOpen?: (v: boolean) => void;
    onClose?: () => void;
}

export default function ModalBase({ children, open, setOpen, onClose }: IModalBaseProps) {
    return open && <div className="fixed inset-0 bg-[rgba(0,0,0,.4)] z-50 flex items-center justify-center">{children}</div>;
}
