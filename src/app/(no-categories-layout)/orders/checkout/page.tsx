'use client';
import { Button, DropdownDistrict, DropdownProvince, DropdownWard } from '@/components';
import { CartContextProvider } from '@/components/common/providers/contexts/cart-context';
import Input from '@/components/inputs/input';
import TextArea from '@/components/inputs/text-area';
import { links } from '@/contans/routes';
import Link from 'next/link';
import React, { ChangeEvent, FocusEvent, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ICartData, IDistrict, IDropdownData, IOrderInfo, IOrderRequest, IProvince, IRefDropdown, IUser, IWard } from '../../../../../interface';
import { redirect } from 'next/navigation';
import { calaculateDiscount, toCurrency } from '@/ultils/funtions';
import { InitialContext } from '@/components/common/providers/contexts/initial-context';
import { useForm } from 'react-hook-form';
import Dropdown from '@/components/inputs/dropdown';
import Tippy from '@tippyjs/react';
import Validate from '@/ultils/validate';
import { confirmAlert } from 'react-confirm-alert';
import FullpageLoading from '@/components/common/loadings/full-page-loading';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/apis/handlers/orders';
import { messages } from '@/ultils/constants';

export interface ICheckoutPageProps {}

export default function CheckoutPage(props: ICheckoutPageProps) {
    const refDistrict = useRef<IRefDropdown>(null);
    const refWard = useRef<IRefDropdown>(null);

    const [itemChecked, setItemChecked] = useState<ICartData[]>([]);

    const [isRule, setIsRule] = useState(false);

    const [alert, setAlert] = useState<string | null>(null);

    const { user, isFetched, refetch } = useContext(InitialContext);
    const { cart, handleClearItemsWhenOrderSucess } = useContext(CartContextProvider);

    const [division, setDivision] = useState<{ province: IProvince | null; district: IDistrict | null; ward: IWard | null }>({ province: null, district: null, ward: null });

    const {
        register,
        handleSubmit,
        setValue,

        watch,
        setError,
        formState: { errors },
    } = useForm<IOrderInfo>({
        defaultValues: {
            fullname: (user && user.fullname) || '',
            email: (user && user.email) || '',
            phone: (user && user.phone) || '',
            province: (user && user.province) || '',
            district: (user && user.district) || '',
            ward: (user && user.ward) || '',
            address: (user && user.address) || '',
            description: '',
        },
    });

    const motion = useMutation({
        mutationKey: ['create-orders'],
        mutationFn: (data: IOrderRequest) => createOrder(data),
        onError(error, variables, context) {
            setAlert(messages.errors.handle);
        },
        onSuccess(data, variables, context) {
            if (!data) {
                setAlert(messages.errors.handle);
                return;
            }

            if (data.code !== 201) {
                setAlert(data.message);
                return;
            }

            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <div className="shadow-xl rounded-lg p-4 py-8 flex flex-col justify-between bg-white gap-4 ">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-[16px] font-medium">{'Đặt hàng thành công'}</h1>
                                <p className="font-medium normal-case text-sm">Chúng tôi sẽ liên hệ với bạn để để xác nhận đơn hàng trong thời gian sớm nhất</p>
                            </div>

                            <div className="flex items-center justify-end gap-4">
                                <button
                                    onClick={() => {
                                        onClose();
                                    }}
                                    className="py-2 px-4 rounded-md hover:bg-[#333] hover:text-white transition-all ease-linear"
                                >
                                    <Link href={links.home}>Quay lại trang chủ</Link>
                                </button>
                                <button
                                    onClick={() => {
                                        if (handleClearItemsWhenOrderSucess) {
                                            handleClearItemsWhenOrderSucess();
                                        }
                                        onClose();
                                    }}
                                    className="py-2 px-4 rounded-md bg-[#333] text-white"
                                >
                                    <Link href={links.products.index}>Tiếp tục mua hàng</Link>
                                </button>
                            </div>
                        </div>
                    );
                },
            });
        },
    });

    const handleOrders = async (values: IOrderInfo) => {
        if (validate()) return;
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="shadow-xl rounded-lg p-4 py-8 flex flex-col justify-between bg-white gap-4 ">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-[16px] font-medium">{'Xác nhận đơn hàng'}</h1>
                            <p className="font-medium normal-case text-sm">Vui lòng kiểm tra kĩ thông tin trước khi gữi. Đơn hàng của bạn sẽ bị hủy nếu thông tin bị sai lệch.</p>
                        </div>

                        <div className="flex items-center justify-end gap-4">
                            <button
                                className="py-2 px-4 rounded-md hover:bg-[#333] hover:text-white transition-all ease-linear"
                                onClick={() => {
                                    onClose();
                                }}
                            >
                                Hủy
                            </button>

                            <button
                                onClick={() => {
                                    motion.mutate({ info: values, data: itemChecked });

                                    onClose();
                                }}
                                className="py-2 px-4 rounded-md bg-[#333] text-white"
                            >
                                Đặt hàng
                            </button>
                        </div>
                    </div>
                );
            },
        });
    };

    useLayoutEffect(() => {
        if (!cart) return;

        if (!cart.length) {
            redirect(links.products.index);
        }

        const itemChecked = cart.filter((item) => item.checked);

        if (!itemChecked.length) {
            redirect(links.orders.basket);
        }

        setItemChecked(itemChecked);
    }, [cart]);

    useLayoutEffect(() => {
        if (!isFetched) return;

        if (!user) {
            redirect(links.auth.login);
        }

        requestIdleCallback(() => {
            setValue('fullname', (user && user.fullname) || '');
            setValue('email', (user && user.email) || '');
            setValue('phone', (user && user.phone) || '');
            setValue('address', (user && user.address) || '');
            setValue('province', (user && user.province) || '');
            setValue('district', (user && user.district) || '');
            setValue('ward', (user && user.ward) || '');
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isFetched]);

    const total = useMemo(() => {
        if (!cart) return 0;

        const result = cart.reduce((cur, value) => {
            if (value.checked) {
                cur += value.size.price * value.quantity * (1 - value.size.discount / 100);
            }

            return cur;
        }, 0);

        return result;
    }, [cart]);

    const handleSetProvince = (item: IDropdownData<IProvince>) => {
        if (refDistrict.current && refDistrict.current.reset) {
            if (item.data?.province_id !== division.province?.province_id) {
                refDistrict.current.reset();
            }
        }

        setDivision({ ...division, province: item.data || null });
    };

    const handleSetIsRule = (e: ChangeEvent<HTMLInputElement>) => {
        setIsRule(e.target.checked);
    };

    const handleSetDistrict = (item: IDropdownData<IDistrict>) => {
        if (refWard.current && refWard.current.reset) {
            if (item.data?.district_id !== division.district?.district_id) {
                refWard.current.reset();
            }
        }
        setDivision({ ...division, district: item.data || null });
    };

    const validate = () => {
        const valid: boolean[] = [];
        if (!division.province) {
            setError('province', { message: 'Bạn chưa chọn Tỉnh/Thành phố' });
            valid.push(true);
        }

        if (!division.district) {
            setError('district', { message: 'Bạn chưa chọn Quận/Huyện' });
            valid.push(true);
        }
        if (!division.ward) {
            setError('ward', { message: 'Bạn chưa chọn Xã/Phường' });
            valid.push(true);
        }

        if (!itemChecked.length) {
            setAlert('Không tìm thấy sản phẩm');
            valid.push(true);
        } else {
            setAlert(null);
        }
        if (!isRule) {
            setAlert('Bạn chưa đồng ý với điều khoản của chúng tôi');
            valid.push(true);
        } else {
            setAlert(null);
        }

        return valid.length > 0;
    };

    return (
        <section className="max-w-[800px] md:max-w-[1320px] w-full p-4 m-auto">
            <div className="grid lg:grid-cols-col-product-detail-des gap-10 my-16">
                <div className="flex flex-col gap-4">
                    <div>
                        <h2 className="uppercase text-[1.2rem] text-ancesst1 font-medium">Thông tin thanh toán</h2>

                        <div className="my-4 flex flex-col gap-4">
                            <Input
                                {...register('fullname', {
                                    required: 'Bạn chưa nhập tên người nhận hàng',
                                })}
                                message={errors.fullname?.message}
                                label="Họ và tên"
                                flagRequired={true}
                            />

                            <div className="grid grid-cols-2 gap-4 w-full">
                                <div className="flex flex-col gap-4">
                                    <Input
                                        {...register('phone', {
                                            required: 'Bạn chưa nhập số điện thoại',
                                            validate: (value) => {
                                                if (!Validate.isPhone(value)) {
                                                    return 'Số điện thoại không hợp lệ';
                                                }
                                            },
                                        })}
                                        message={errors.phone?.message}
                                        label="Số điện thoại"
                                        flagRequired={true}
                                    />
                                    <DropdownProvince
                                        message={errors.province?.message}
                                        {...register('province', {
                                            required: 'Vui lòng nhập Tỉnh/Thành phố',
                                            onChange: () => {
                                                setDivision({ province: null, district: null, ward: null });
                                                if (refDistrict.current && refDistrict.current.reset) {
                                                    refDistrict.current.reset();
                                                }

                                                if (refWard.current && refWard.current.reset) {
                                                    refWard.current.reset();
                                                }
                                            },
                                        })}
                                        search={watch('province')}
                                        setError={(message) => setError('province', { message })}
                                        setValue={(value) => setValue('province', value)}
                                        onClickItem={handleSetProvince}
                                        label="Tỉnh/Thành phố"
                                        flagRequired={true}
                                    />
                                    <DropdownWard
                                        {...register('ward', {
                                            required: 'Vui lòng nhập Xã/Phường',
                                            onChange: () => {
                                                setDivision({ ...division, ward: null });
                                            },
                                        })}
                                        search={watch('ward')}
                                        setValue={(value) => setValue('ward', value)}
                                        setError={(message) => setError('ward', { message })}
                                        message={errors.ward?.message}
                                        onClickItem={(item) => {
                                            setDivision({ ...division, ward: item.data || null });
                                        }}
                                        refDropdown={refWard}
                                        dependencyData={division.district}
                                        label="Xã/Phường"
                                        flagRequired={true}
                                    />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <Input
                                        {...register('email', {
                                            required: 'Bạn chưa nhập email',
                                            validate: (value) => {
                                                if (!Validate.isEmail(value)) {
                                                    return 'Email không hợp lệ';
                                                }
                                            },
                                        })}
                                        {...register('email')}
                                        message={errors.email?.message}
                                        label="Email"
                                        flagRequired={true}
                                    />
                                    <DropdownDistrict
                                        search={watch('district')}
                                        {...register('district', {
                                            required: 'Vui lòng nhập Quận/Huyện',
                                            onChange: () => {
                                                setDivision({ ...division, district: null, ward: null });

                                                if (refWard.current && refWard.current.reset) {
                                                    refWard.current.reset();
                                                }
                                            },
                                        })}
                                        message={errors.district?.message}
                                        setValue={(value) => setValue('district', value)}
                                        setError={(message) => setError('district', { message })}
                                        onClickItem={handleSetDistrict}
                                        refDropdown={refDistrict}
                                        label="Quận/Huyện"
                                        dependencyData={division.province}
                                    />
                                    <Input
                                        {...register('address', {
                                            required: 'Bạn chưa nhập địa chỉ giao hàng',
                                        })}
                                        message={errors.address?.message}
                                        label="Địa chỉ giao hàng"
                                        flagRequired={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <h2 className="uppercase text-[1.2rem] text-ancesst1 font-medium">Thông tin bổ sung</h2>

                        <div className="my-4 flex flex-col gap-4">
                            <TextArea label="Ghi chú cho đơn hàng" {...register('description')} />
                        </div>
                    </div>
                </div>
                <div className="border-2 border-ancesst1 rounded my-4 p-4">
                    <h2 className="uppercase text-[1.2rem] text-ancesst1 font-medium text-center">Đơn hàng của bạn</h2>
                    <table className="w-full mb-4 border-spacing-0 border-[#ececec]">
                        <thead>
                            <tr className="border-b border-ancesst6">
                                <th align="left" className="p-2 text-ancesst1">
                                    Sản phẩm
                                </th>
                                <th align="right" className=" text-ancesst1">
                                    Tạm tính
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemChecked.map((item, index) => {
                                return (
                                    <tr key={item.id + index} className="border-b ">
                                        <td align="left" className="py-2 pl-2 font-medium">
                                            {item.name} &nbsp; <strong>× &nbsp;{item.quantity}</strong>
                                            <div className="flex items-center gap-2">
                                                {item.showSize && <dl>Size: {item.size.name}</dl>}
                                                {item.size.discount > 0 && <dl>Giảm giá: {item.size.discount}%</dl>}
                                            </div>
                                        </td>
                                        <td align="right" className="py-2">
                                            <span className="font-medium">{toCurrency(calaculateDiscount(item.size.price, item.size.discount))}</span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th align="left" className=" pl-2">
                                    Tạm tính
                                </th>
                                <td align="right" className="py-2">
                                    <span className="">{toCurrency(total)}</span>
                                </td>
                            </tr>

                            <tr className="order-total">
                                <th align="left" className=" pl-2">
                                    Tổng
                                </th>
                                <td align="right">
                                    <strong>
                                        <span className="">
                                            <bdi>{toCurrency(total)}</bdi>
                                        </span>
                                    </strong>{' '}
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                    <div>
                        <p className="pl-2 font-medium text-justify my-8 block text-ancesst1 text-[12px]">
                            Hoá đơn chưa kèm phí ship (Quý khách thanh toán bằng tiền mặt hoặc chuyển khoản theo yêu cầu với đơn hàng của shop).
                        </p>

                        <div className="px-2 flex items-center gap-2 cursor-pointer select-none ">
                            <input checked={isRule} onChange={handleSetIsRule} id="rules" type="checkbox" />
                            <label htmlFor="rules" className="text-ancesst1 text-[12px] cursor-pointer">
                                Tôi đã đọc và đồng ý với{' '}
                                <Link className="hover:underline text-violet-primary" href={links.rules}>
                                    điều khoản và điều kiện
                                </Link>{' '}
                                của website <span className="text-heart">*</span>
                            </label>
                        </div>

                        {alert && (
                            <div className="my-8 px-2 w-full flex items-center justify-center">
                                <span className="text-heart">{alert}</span>
                            </div>
                        )}

                        <div className="my-8 px-2">
                            <Button onClick={handleSubmit(handleOrders)} title="Đặt hàng" />
                        </div>

                        <div className="px-2">
                            <p className=" text-justify text-[12px]">
                                Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, tăng trải nghiệm sử dụng website, và cho các mục đích cụ thể khác đã được mô tả trong{' '}
                                <Link className="hover:underline text-violet-primary" href={links.privacy}>
                                    chính sách riêng tư.
                                </Link>{' '}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {motion.isPending && <FullpageLoading />}
        </section>
    );
}
