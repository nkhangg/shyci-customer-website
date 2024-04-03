import axios from '../config';
import { IBaseApi, IChangePassRequest, ICustomerRequest, IDCustomer, IDOrder, IFilter, IFilterOrder, IImageProduct, IOrder, IPagination } from '../../../interface';
import { removeFalsyValues } from '@/ultils/funtions';
import { AxiosError } from 'axios';

export const getCustomer = async (queries?: IFilter) => {
    const newObj = removeFalsyValues(queries || {});

    try {
        const response = await axios({
            method: 'GET',
            url: 'customers',
            params: newObj,
        });

        if (!response) return null;

        return response.data as IPagination<IDCustomer>;
    } catch (error) {
        const erorrs = error as AxiosError;
        return erorrs.response?.data as unknown as IPagination<IDCustomer>;
    }
};

export const updateCustomer = async (data?: ICustomerRequest) => {
    const newObj = removeFalsyValues(data || {});

    try {
        const response = await axios({
            method: 'PATCH',
            url: 'customers',
            data: newObj,
        });

        if (!response) return null;

        return response.data as IBaseApi<IDCustomer>;
    } catch (error) {
        const erorrs = error as AxiosError;
        return erorrs.response?.data as unknown as IBaseApi<IDCustomer>;
    }
};

export const changePasswordCustomer = async ({ newPass, password }: IChangePassRequest) => {
    try {
        const response = await axios({
            method: 'PUT',
            url: 'customers',
            data: {
                oldPassword: password,
                newPassword: newPass,
            },
        });

        if (!response) return null;

        return response.data as IBaseApi<IDCustomer>;
    } catch (error) {
        const erorrs = error as AxiosError;
        return erorrs.response?.data as unknown as IBaseApi<IDCustomer>;
    }
};
