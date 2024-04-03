import { IDropdownData } from '../../interface';

const linksDefault = {
    products: '/products',
};

export const links = {
    home: '/',
    products: {
        index: linksDefault.products,
        detail: (id: string, name: string) => {
            return linksDefault.products + `/detail/${id}/${name.replaceAll(' ', '-')}`;
        },
        queries: (name: string, key?: string) => {
            return linksDefault.products + `?${key}=${name.replaceAll(' ', '-')}`;
        },
        queriesCategories: (data: IDropdownData<any>, key?: string) => {
            return linksDefault.products + `?${key}=${data.name.replaceAll(' ', '-')}&id=${data.id}`;
        },
    },
    auth: {
        login: '/login',
        register: '/register',
        profile: '/profile',
        registergg: (id: string) => {
            return '/register/' + id;
        },
    },
    orders: {
        basket: '/orders/basket',
        checkout: '/orders/checkout',
        orderDetail: (id: string) => {
            return '/orders/detail/' + id;
        },
    },
    rules: '/rules',
    privacy: '/privacy-policy',
};
