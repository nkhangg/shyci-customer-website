import axios from 'axios';
import { IDistrict, IDivision, IProvince, IWard } from '../../../interface';

const localAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_DIVISION,
});

export const getProvince = async () => {
    try {
        const response = await localAxios({
            method: 'GET',
            url: 'province/',
        });

        if (!response) return null;

        return response.data as IDivision<IProvince>;
    } catch (error) {
        return null;
    }
};

export const getDistrict = async (data: IProvince | null) => {
    if (!data) return null;
    try {
        const response = await localAxios({
            method: 'GET',
            url: 'province/district/' + data.province_id,
        });

        if (!response) return null;

        return response.data as IDivision<IDistrict>;
    } catch (error) {
        return null;
    }
};
export const getWard = async (data: IDistrict | null) => {
    if (!data) return null;
    try {
        const response = await localAxios({
            method: 'GET',
            url: 'province/ward/' + data.district_id,
        });

        if (!response) return null;

        return response.data as IDivision<IWard>;
    } catch (error) {
        return null;
    }
};
