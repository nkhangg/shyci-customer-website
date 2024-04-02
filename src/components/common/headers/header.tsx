'use client';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { IHeaderItem, headers } from '@/data/common/data';
import Link from 'next/link';
import { Categories, Logo, Tags } from '../..';
import { links } from '@/contans/routes';
// import  from 'react-modern-drawer';
import ShopNav from './shop-nav';
import ArchivesNav from './archives-nav';
import { FaBars } from '@meronex/icons/fa/';
import { AiOutlineClose } from '@meronex/icons/ai/';
import dynamic from 'next/dynamic';
import { useAuthStore } from '@/stores/useStateAuth';
import { CartContextProvider } from '../providers/contexts/cart-context';
const Drawer = dynamic(() => import('react-modern-drawer'), { ssr: false });

export interface IHeaderProps {
    themes?: 'dark' | 'light';
    categories?: boolean;
}

export default function Header({ themes = 'light', categories = false }: IHeaderProps) {
    const dataNav = {
        shop: ShopNav,
        archives: ArchivesNav,
    };

    // zustants
    const { user } = useAuthStore();

    const { cart } = useContext(CartContextProvider);

    const [openNav, setOpenNav] = useState(false);
    const [dataNavId, setDataNavId] = useState<'shop' | 'archives'>('shop');
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleToggleDrawer = () => {
        setOpenDrawer((prev) => !prev);
    };

    const renderNav = useMemo(() => {
        const Tags = dataNav[dataNavId];

        return <Tags />;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataNavId]);

    const renderRightData = useCallback(
        (item: IHeaderItem) => {
            if (item.id === 'bag') {
                return (
                    <Tags href={item.link} component="span" className="hover:underline cursor-pointer px-[10px] font-medium flex items-center gap-1" key={item.title}>
                        <span>{item.title}</span>
                        <span>{cart ? cart.length : 0}</span>
                    </Tags>
                );
            }

            if (item.id === 'me') {
                return (
                    <Tags href={links.auth.profile} component="span" className="hover:underline cursor-pointer px-[10px] font-medium flex items-center gap-1" key={item.title}>
                        <span>{item.title}</span>
                    </Tags>
                );
            }

            return (
                <Tags href={item.link} component="span" className="hover:underline cursor-pointer px-[10px] font-medium" key={item.title}>
                    {item.title}
                </Tags>
            );
        },
        [user, cart],
    );

    const handleOpenNav = (item: IHeaderItem) => {
        if (['shop', 'archives'].includes(item.id)) {
            setOpenNav(true);
            setDataNavId(item.id as typeof dataNavId);
        }
    };
    return (
        <header className="fixed top-0 left-0 right-0 z-40 select-none">
            <div
                className={classNames('h-header flex top-0 items-center justify-between py-2 px-4 ', {
                    'bg-primary-dark text-primary-light': themes === 'dark',
                    'bg-primary': themes === 'light',
                })}
            >
                <div className="items-center hidden md:flex w-1/3">
                    {headers.left.map((item) => {
                        return (
                            <Link onMouseEnter={() => handleOpenNav(item)} href={item.link} className="hover:underline cursor-pointer px-[10px] font-medium" key={item.title}>
                                {item.title}
                            </Link>
                        );
                    })}
                </div>
                <div className="text-xl flex w-[40%] md:hidden ">
                    <span onClick={handleToggleDrawer} className="cursor-pointer">
                        <FaBars />
                    </span>
                </div>
                <div className="flex-1 w-full h-full flex items-center justify-center">
                    <Logo themes={themes} />
                </div>
                <div className=" hidden md:flex items-center justify-end w-1/3">
                    {headers.right.map((item) => {
                        return renderRightData(item);
                    })}
                </div>
                <div className="flex w-[40%] md:hidden items-center justify-end">
                    {headers.rightMobi.map((item) => {
                        return renderRightData(item);
                    })}
                </div>
            </div>

            {categories && <Categories />}

            {openNav && (
                <div
                    onMouseLeave={async (e) => {
                        e.stopPropagation();
                        setOpenNav(false);
                    }}
                    className={classNames(' w-screen md:w-[400px] z-40 fixed top-header left-0 bottom-0  py-10 px-4 text-[12px]', {
                        ['bg-black text-primary-light']: themes === 'dark',
                        ['bg-white text-primary']: themes === 'light',
                    })}
                >
                    {renderNav}
                </div>
            )}

            <Drawer size={'100vw'} style={{ overflow: 'auto' }} open={openDrawer} onClose={handleToggleDrawer} direction="left" className="relative">
                <div onClick={handleToggleDrawer} className="absolute p-2 text-xl cursor-pointer top-0 right-0">
                    <AiOutlineClose />
                </div>

                <div className="flex flex-col text-[15px] px-[10px] py-10 overflow-y-auto">
                    <span className="py-4 font-medium">SHOP</span>
                    <ShopNav drawer={true} />
                    <span className="py-4 font-medium">ARCHIVE</span>
                    <ArchivesNav />
                    <span className="py-4 font-medium hover:underline">STOCKISTS</span>
                    <div className="mt-16 flex flex-col gap-1">
                        {headers.right.map((item) => {
                            return renderRightData(item);
                        })}
                    </div>
                </div>
            </Drawer>
        </header>
    );
}
