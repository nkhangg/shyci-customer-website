import axios from '../config';
import { IBaseApi, IDOrder, IFilterOrder, IImageProduct, IOrder, IOrderRequest, IPagination } from '../../../interface';
import { removeFalsyValues } from '@/ultils/funtions';
import { AxiosError } from 'axios';

export const createOrder = async (data: IOrderRequest) => {
    if (!data.data.length) return null;

    const products = data.data.map((item) => {
        return {
            productId: item.id,
            quantity: item.quantity,
            sizeId: item.size.id,
        };
    });

    try {
        const response = await axios({
            method: 'POST',
            url: 'orders',
            data: {
                ...data.info,
                products,
            },
        });

        if (!response) return null;

        return response.data as IBaseApi<IDOrder>;
    } catch (error) {
        const erorrs = error as AxiosError;
        return erorrs.response?.data as unknown as IBaseApi<any>;
    }
};
