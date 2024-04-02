'use client';
import React, { ReactNode, createContext, useEffect, useLayoutEffect, useState } from 'react';
import { ICartData } from '../../../../../interface';
import { getConfig, setConfig } from '@/ultils/local-storege';

export interface ICartContextProps {
    children: ReactNode;
}

export interface ICartContext {
    cart?: ICartData[] | null;
    setCart?: (data: ICartData) => void;
    deleteCart?: (data: ICartData) => void;
    updateChecked?: (data: ICartData) => void;
    checkAll?: (value?: boolean) => void;
    updateQuantity?: (data: ICartData, quantity: number) => void;
    handleClearItemsWhenOrderSucess?: () => void;
}

export const CartContextProvider = createContext<ICartContext>({});

export default function CartContext({ children }: ICartContextProps) {
    const [cart, setCart] = useState<ICartData[] | null>(null);

    const handleSetCart = (data: ICartData) => {
        if (!cart || cart.length <= 0) {
            setCart([data]);

            return;
        }

        const includeData = cart.find((item) => item.id === data.id && item.size.id === data.size.id);

        if (includeData) {
            includeData.quantity = data.quantity + includeData.quantity;
            setCart(cart);

            return;
        }

        setCart([data, ...cart]);
    };

    const handleIncrement = (data: ICartData, quantity: number) => {
        if (!cart) return;

        const includeData = cart.find((item) => item.id === data.id && item.size.id === data.size.id);

        if (!includeData) return;

        includeData.quantity = quantity;

        setCart([...cart]);
    };

    const updateChecked = (data: ICartData) => {
        if (!cart) return;

        const includeData = cart.find((item) => item.id === data.id && item.size.id === data.size.id);

        if (!includeData) return;

        includeData.checked = !includeData.checked;

        setCart([...cart]);
    };

    const checkAll = (value = true) => {
        if (!cart) return;

        const newCart = cart.map((item) => {
            return {
                ...item,
                checked: value,
            };
        });

        setCart(newCart);
    };

    const handleDeleteItem = (data: ICartData) => {
        if (!cart) return;

        const newCart = cart.filter((item) => item.id !== data.id || item.size.id !== data.size.id);

        setCart(newCart);
    };

    const handleClearItemsWhenOrderSucess = () => {
        if (!cart) return;

        const newCart = cart.filter((item) => !item.checked);

        setCart(newCart);
    };

    const setCartToLocal = () => {
        if (!cart) return;

        setConfig('cart', JSON.stringify(cart));
    };

    useEffect(() => {
        if (!cart) return;

        setCartToLocal();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart]);

    useLayoutEffect(() => {
        const local = getConfig('cart');

        if (local) {
            const data = JSON.parse(local) as ICartData[];

            setCart(data);
        }

        return;
    }, []);
    return (
        <CartContextProvider.Provider
            value={{ cart: cart, setCart: handleSetCart, deleteCart: handleDeleteItem, updateQuantity: handleIncrement, checkAll, updateChecked, handleClearItemsWhenOrderSucess }}
        >
            {children}
        </CartContextProvider.Provider>
    );
}
