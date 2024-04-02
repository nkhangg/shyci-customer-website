import { AxiosError } from 'axios';
import { IBaseApi, IDropdownData, IFilter } from '../../../interface';
import axios from '../config';
import { removeFalsyValues } from '@/ultils/funtions';

export const getCategories = async (filters?: IFilter) => {
    const newObj: Record<string, any> = removeFalsyValues(filters || {});

    try {
        const response = await axios({
            method: 'GET',
            url: 'categories',
            params: { ...newObj },
        });

        if (!response) return null;

        return response.data as IBaseApi<IDropdownData<any>[]>;
    } catch (error) {
        const erorrs = error as AxiosError;
        return erorrs.response?.data as unknown as IBaseApi<any>;
    }
};
