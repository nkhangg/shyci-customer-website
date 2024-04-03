'use client';
import Tippy from '@tippyjs/react/headless';
import React, { ChangeEvent, forwardRef, memo, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Input, { IInputProps } from '../../input';
import { AiOutlineDown, AiOutlineUp } from '@meronex/icons/ai';
import { useQuery } from '@tanstack/react-query';
import { getProvince } from '@/apis/handlers/division';
import Dropdown from '../../dropdown';
import { IDropdownData, IProvince } from '../../../../../interface';

export interface IDropdownProvinceProps extends IInputProps {
    onClickItem?: (item: IDropdownData<IProvince>) => void;
    setValue?: (value: string) => void;
    setError?: (message: string) => void;
    search?: string;
}

const DropdownProvince = forwardRef(({ search, onClickItem, setValue, setError, ...props }: IDropdownProvinceProps, ref: any) => {
    const refInput = useRef<HTMLInputElement>(null);

    const { data } = useQuery({
        queryKey: ['get-province'],
        queryFn: () => getProvince(),
    });

    const dataMemo = useMemo(() => {
        if (!data) return [] as IDropdownData<IProvince>[];

        return data.results.map((item) => {
            return {
                id: item.province_id,
                name: item.province_name,
                data: item,
            } as IDropdownData<IProvince>;
        });
    }, [data]);

    const handleClickItem = (item: IDropdownData<any>) => {
        if (refInput.current) {
            refInput.current.value = item.name;
        }

        if (setValue) {
            setValue(item.name);
        }

        if (onClickItem) {
            onClickItem(item);
        }

        if (setError) {
            setError('');
        }
    };

    return (
        <div ref={ref} className="w-full h-full">
            <Dropdown ref={refInput} onClickItem={handleClickItem} options={{ fulltextSearch: true }} search={search} data={dataMemo} {...props} />
        </div>
    );
});

DropdownProvince.displayName = 'DropdownProvince';

export default memo(DropdownProvince);
