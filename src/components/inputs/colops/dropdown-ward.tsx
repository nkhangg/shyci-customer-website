'use client';
import Tippy from '@tippyjs/react/headless';
import React, { ChangeEvent, RefObject, forwardRef, memo, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Input, { IInputProps } from '../input';
import { AiOutlineDown, AiOutlineUp } from '@meronex/icons/ai';
import { useQuery } from '@tanstack/react-query';
import { getDistrict, getProvince, getWard } from '@/apis/handlers/division';
import Dropdown from '../dropdown';
import { IDistrict, IDropdownData, IProvince, IRefDropdown, IWard } from '../../../../interface';

export interface IDropdownWardProps extends IInputProps {
    dependencyData: IDistrict | null;
    refDropdown?: RefObject<IRefDropdown>;
    onClickItem?: (data: IDropdownData<IWard>) => void;
    setValue?: (value: string) => void;
    setError?: (message: string) => void;

    search?: string;
}

const DropdownWard = forwardRef(({ dependencyData, refDropdown, search, setError, onClickItem, setValue, ...props }: IDropdownWardProps, ref: any) => {
    const [dataList, setDataList] = useState<IDropdownData<IWard>[]>([]);

    const { data } = useQuery({
        queryKey: ['get-ward', dependencyData],
        queryFn: () => getWard(dependencyData),
    });

    useEffect(() => {
        if (!data) {
            setDataList([]);
            return;
        }

        const newList = data.results.map((item) => {
            return {
                id: item.ward_id,
                name: item.ward_name,
                data: item,
            } as IDropdownData<IWard>;
        });
        setDataList(newList);
    }, [data]);

    const handleClickItem = (item: IDropdownData<IWard>) => {
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

    useLayoutEffect(() => {
        if (setValue) {
            setValue('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dependencyData]);

    useImperativeHandle(refDropdown, () => {
        return {
            reset: () => {
                setDataList([]);
                if (setValue) {
                    setValue('');
                }
            },
        };
    });

    return (
        <div ref={ref} className="w-full h-full">
            <Dropdown onClickItem={handleClickItem} options={{ fulltextSearch: true }} data={dataList} search={search} {...props} />
        </div>
    );
});

DropdownWard.displayName = 'DropdownWard';

export default memo(DropdownWard);
