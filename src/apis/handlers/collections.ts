import { AxiosError } from 'axios';
import axios from '../config';
import { IBaseApi, IPagination, IRowCollection } from '../../../interface';

export const collections = async (page?: number) => {
    try {
        const response = await axios({
            method: 'GET',
            url: 'conllections-home',
            params: {
                page,
            },
        });

        if (!response) return null;

        return response.data as IBaseApi<IPagination<IRowCollection>>;
    } catch (error) {
        const erorrs = error as AxiosError;
        return erorrs.response?.data as unknown as IBaseApi<any>;
    }
};
