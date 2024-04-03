'use client';
import Tippy from '@tippyjs/react/headless';
import React, { ChangeEvent, RefObject, forwardRef, memo, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Input, { IInputProps } from '../../input';
import { AiOutlineDown, AiOutlineUp } from '@meronex/icons/ai';
import { useQuery } from '@tanstack/react-query';
import { getDistrict, getProvince } from '@/apis/handlers/division';
import Dropdown from '../../dropdown';
import { IDistrict, IDropdownData, IProvince, IRefDropdown, IWard } from '../../../../../interface';

export interface IDropdownDistrictProps extends IInputProps {
    dependencyData: IProvince | null;
    refDropdown?: RefObject<IRefDropdown>;
    onClickItem?: (data: IDropdownData<IDistrict>) => void;
    setValue?: (value: string) => void;
    setError?: (message: string) => void;
    search?: string;
}

const DropdownDistrict = forwardRef(({ dependencyData, refDropdown, search, setError, onClickItem, setValue, ...props }: IDropdownDistrictProps, ref: any) => {
    const [dataList, setDataList] = useState<IDropdownData<IDistrict>[]>([]);

    const { data } = useQuery({
        queryKey: ['get-district', dependencyData],
        queryFn: () => getDistrict(dependencyData),
    });

    useEffect(() => {
        if (!data) {
            setDataList([]);
            return;
        }

        const newList = data.results.map((item) => {
            return {
                id: item.district_id,
                name: item.district_name,
                data: item,
            } as IDropdownData<IDistrict>;
        });
        setDataList(newList);
    }, [data]);

    const handleClickItem = (item: IDropdownData<IDistrict>) => {
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

DropdownDistrict.displayName = 'DropdownDistrict';

export default memo(DropdownDistrict);
