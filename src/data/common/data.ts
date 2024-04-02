import { links } from '@/contans/routes';

export interface IHeaderItem {
    id: string;
    title: string;
    link: string;
}
export const headers = {
    left: [
        {
            id: 'shop',
            title: 'shop',
            link: links.products.index,
        },
        {
            id: 'archives',
            title: 'archives',
            link: links.products.index,
        },
        {
            id: 'stockists',
            title: 'stockists',
            link: '/',
        },
    ],
    right: [
        {
            id: 'me',
            title: 'me',
            link: '/',
        },
        {
            id: 'bag',
            title: 'bag',
            link: links.orders.basket,
        },
        {
            id: 'search',
            title: 'search',
            link: '/search',
        },
    ],
    rightMobi: [
        {
            id: 'bag',
            title: 'bag',
            link: '',
        },
    ],
};

export const customerService = {
    title: 'CUSTOMER SERVICES: +82 02 511 7288',
    link: '',
};

export const footers = {
    footer: [
        {
            title: 'TERMS & CONDITIONS',
            link: '/',
        },
        {
            title: 'PRIVACY / COOKIES',
            link: '/',
        },
        {
            title: 'INSTAGRAM',
            link: '/',
        },
        {
            title: 'YOUTUBE',
            link: '/',
        },
        {
            title: 'NOTICE',
            link: '/',
        },
        {
            title: ' Q&A',
            link: '/',
        },
    ],
    infoAndConpyright: [
        {
            title: 'REGISTRATION: 261-81-01530',
            link: '',
        },
        {
            title: 'E-COMMERCE PERMIT: 2013-서울강남-02629',
            link: '',
        },
        {
            title: 'LEE@LAYERCOLTD.COM',
            link: '',
        },
        customerService,
        {
            title: '3F, 139, DOSAN-DAERO, GANGNAM-GU, SEOUL, REPUBLIC OF KOREA',
            link: '',
        },
    ],
};

export const archives = [
    {
        title: 'home',
        link: links.home,
        hightlight: true,
    },
    {
        title: 'shop',
        link: links.products.index,
        hightlight: false,
    },
];

export const categories = [
    {
        title: 'SPRING CAMPAIGN',
        link: '/',
        hightlight: true,
    },
    {
        title: 'PUMA X LMC',
        link: '/',
        hightlight: false,
    },
    {
        title: 'LMC X HAHA HA',
        link: '/',
        hightlight: false,
    },
    {
        title: 'NEW ARRIVALS',
        link: '/',
        hightlight: false,
    },
    {
        title: 'OUTER',
        link: '/',
        hightlight: false,
    },
    {
        title: 'TOP',
        link: '/',
        hightlight: false,
    },
    {
        title: 'BOTTOM',
        link: '/',
        hightlight: false,
    },
    {
        title: 'DENIM',
        link: '/',
        hightlight: false,
    },
    {
        title: 'HEADWEAR',
        link: '/',
        hightlight: false,
    },
    {
        title: 'ACC',
        link: '/',
        hightlight: false,
    },
    {
        title: 'BAG',
        link: '/',
        hightlight: false,
    },
    {
        title: 'WOMENS PACK',
        link: '/',
        hightlight: false,
    },
    {
        title: 'GARAGE',
        link: '/',
        hightlight: false,
    },
];
