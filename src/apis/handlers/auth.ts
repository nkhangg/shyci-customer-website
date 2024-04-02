import axios from '../config';
import { IBaseApi, IUser } from '../../../interface';
import { keysLocalStorage } from '@/ultils/local-storege';

export const login = async (data: { username: string; password: string }) => {
    try {
        const response = await axios({
            method: 'POST',
            url: 'auths/login',
            data,
        });

        if (!response) return null;

        return response.data as IBaseApi<{ token: string; refreshToken: string }> & { errors?: { username?: string; password?: string } };
    } catch (error) {
        return null;
    }
};

export const loginGoogle = async (id: string, email: string) => {
    try {
        const response = await axios({
            method: 'POST',
            url: 'auths/login/google/' + id,
            data: {
                email,
            },
        });

        if (!response) return null;

        return response.data as IBaseApi<{ token: string; refreshToken: string }> & { errors?: { username?: string; password?: string } };
    } catch (error) {
        return null;
    }
};

export const registerCustomer = async (data: { username: string; password: string; email: string }) => {
    try {
        const response = await axios({
            method: 'POST',
            url: 'auths/register',
            data,
        });

        if (!response) return null;

        return response.data as IBaseApi<{ token: string; refreshToken: string }> & { errors?: { username?: string; password?: string; email?: string } };
    } catch (error) {
        return null;
    }
};

export const registerGoogleCustomer = async (id: string, data: { username: string; email: string }) => {
    try {
        const response = await axios({
            method: 'POST',
            url: 'auths/register/google/' + id,
            data,
        });

        if (!response) return null;

        return response.data as IBaseApi<{ token: string; refreshToken: string }> & { errors?: { username?: string } };
    } catch (error) {
        return null;
    }
};

export const profilePoper = async () => {
    try {
        if (!localStorage.getItem(keysLocalStorage.token)) return null;

        const response = await axios({
            method: 'GET',
            url: 'customers/me',
        });

        if (!response) return null;

        return response.data as IBaseApi<IUser>;
    } catch (error) {
        return null;
    }
};
