'use client';
import React, { ChangeEvent, RefObject, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Input, { IInputProps } from './input';
import { AiOutlineDown, AiOutlineMail, AiOutlineUp } from '@meronex/icons/ai';
import Tippy from '@tippyjs/react/headless';
import { IDropdownData, IRefDropdown } from '../../../interface';
import { useDebounce } from '@/hooks';
import Validate from '@/ultils/validate';
import { generateKeywords } from '@/ultils/funtions';

export interface IDropdownProps extends IInputProps {
    data: IDropdownData<any>[];
    onClickItem?: (data: IDropdownData<any>) => void;
    options?: {
        fulltextSearch: boolean;
    };
    refDropdown?: RefObject<IRefDropdown>;
    search?: string;
}

export default function Dropdown({ data, search, onClickItem, options = { fulltextSearch: false }, refDropdown, ...props }: IDropdownProps) {
    const ref = useRef<HTMLDivElement>(null);

    const [width, setWidth] = useState(100);

    const [open, setOpen] = useState(false);

    const searchD = useDebounce((search && search) || (props?.value as string) || '', 200);

    const handleClose = () => {
        setOpen(false);
    };

    const toggle = () => {
        setOpen((prev) => !prev);
    };

    useLayoutEffect(() => {
        if (!ref.current) return;

        setWidth(ref.current.getBoundingClientRect().width);
    }, []);

    const handleClickItem = (item: IDropdownData<any>) => {
        if (onClickItem) {
            onClickItem(item);
        }

        handleClose();
    };

    const handleInput = () => {
        setOpen(true);
    };

    const dataMemo = useMemo(() => {
        if (!options.fulltextSearch) return data;

        if (Validate.isBlank(searchD)) return data;

        return data.filter((item) => generateKeywords(item.name.toLowerCase()).includes(searchD.toLowerCase()));
    }, [data, searchD, options.fulltextSearch]);

    return (
        <div className="w-full h-full">
            <Tippy
                onClickOutside={handleClose}
                visible={open}
                interactive={true}
                placement="bottom"
                render={(attr) => {
                    return (
                        <div
                            style={{
                                width: width + 'px',
                            }}
                            {...attr}
                            className=" border rounded py-1 bg-white text-primary shadow-2xl max-h-[400px] scroll"
                            tabIndex={-1}
                        >
                            <ul className="flex flex-col">
                                {dataMemo.length > 0 &&
                                    dataMemo.map((item) => {
                                        return (
                                            <li
                                                key={item.id}
                                                onClick={onClickItem ? () => handleClickItem(item) : undefined}
                                                className="py-2 px-4 text-xs hover:bg-[#f2f2f2] cursor-pointer"
                                            >
                                                {item.name}
                                            </li>
                                        );
                                    })}

                                {dataMemo.length <= 0 && <li className="py-2 px-4 text-xs hover:bg-[#f2f2f2] cursor-pointer">Không tìm thấy kết quả</li>}
                            </ul>
                        </div>
                    );
                }}
            >
                <div ref={ref} className="w-full">
                    <Input onInput={handleInput} onClick={toggle} {...props} rightIcon={!open ? <AiOutlineDown /> : <AiOutlineUp />} />
                </div>
            </Tippy>
        </div>
    );
}
