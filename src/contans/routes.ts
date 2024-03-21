const linksDefault = {
    products: '/products',
};

export const links = {
    home: '/',
    products: {
        index: linksDefault.products,
        detail: (id: string, name: string) => {
            return linksDefault.products + `/detail/${id}/${name}`;
        },
    },
    auth: {
        login: '/login',
        register: '/register',
    },
    orders: {
        basket: '/orders/basket',
    },
    rules: '/rules',
};
