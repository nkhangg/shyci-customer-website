/* eslint-disable @next/next/no-img-element */
'use client';
import { Button, ComfirmUiDefault, DropdownDistrict, DropdownProvince, DropdownWard, ModalBase, OrderInfo, OrderItem, PrimaryLoading, SettingItem } from '@/components';
import FullpageLoading from '@/components/common/loadings/full-page-loading';
import { InitialContext } from '@/components/common/providers/contexts/initial-context';
import Input from '@/components/inputs/input';
import { links } from '@/contans/routes';
import { useGetOrders } from '@/hooks';
import { buildAddress, toCurrency } from '@/ultils/funtions';
import appService from '@/ultils/services/app-service';
import { AiFillSetting, AiOutlineInbox, AiOutlineInfoCircle, AiOutlineRight, AiOutlineUser } from '@meronex/icons/ai';
import Tippy from '@tippyjs/react';
import { redirect, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useForm } from 'react-hook-form';
import { IChangePassRequest, ICustomerRequest, IDistrict, IDropdownData, IProvince, IRefDropdown, IWard } from '../../../../interface';
import { messages } from '@/ultils/constants';
import { changePasswordCustomer, updateCustomer } from '@/apis/handlers/customer';
import Validate from '@/ultils/validate';

export interface IProfilePageProps {}

export default function ProfilePage(props: IProfilePageProps) {
    const refDistrict = useRef<IRefDropdown>(null);
    const refWard = useRef<IRefDropdown>(null);

    const { user, isFetched, refetch } = useContext(InitialContext);

    const [openFullname, setOpenFullname] = useState(false);
    const [openPhone, setOpenPhone] = useState(false);
    const [openDivision, setOpenDivision] = useState(false);
    const [openChangePassword, setOpenChangePassword] = useState(false);
    const [division, setDivision] = useState<{ province: IProvince | null; district: IDistrict | null; ward: IWard | null }>({ province: null, district: null, ward: null });

    const [alert, setAlert] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useLayoutEffect(() => {
        if (!isFetched) {
            return;
        }

        if (!user) {
            redirect(links.auth.login);
        }

        requestIdleCallback(() => {
            setValue('fullname', user.fullname || '');
            formPhone.setValue('phone', user.phone || '');
            formDivision.setValue('province', user.province || '');
            formDivision.setValue('district', user.district || '');
            formDivision.setValue('ward', user.ward || '');
            formDivision.setValue('address', user.address || '');
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isFetched]);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fullname: '',
        },
    });
    const formPhone = useForm({
        defaultValues: {
            phone: '',
        },
    });
    const formDivision = useForm({
        defaultValues: {
            province: '',
            district: '',
            ward: '',
            address: '',
        },
    });
    const formChangePass = useForm({
        defaultValues: {
            password: '',
            newPass: '',
            comfirmPass: '',
        },
    });

    const handleLogout = async () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <ComfirmUiDefault
                        onOk={async () => {
                            await appService.handleLogout();

                            requestIdleCallback(() => {
                                if (refetch) {
                                    refetch();
                                }
                            });

                            router.push(links.home);
                        }}
                        onClose={onClose}
                        title="Xác nhận đăng xuất"
                        description="Bạn sẽ đăng xuất khỏi ứng dụng"
                    />
                );
            },
        });
    };

    const handleOpenFullname = async () => {
        setOpenFullname(true);
    };

    const handleUpdate = async (data: ICustomerRequest, handleClose?: Function) => {
        try {
            setLoading(true);
            const response = await updateCustomer(data);

            if (!response || response.code !== 200) {
                setAlert(response?.message || null);
                return;
            }

            if (handleClose) {
                handleClose();
            }
        } catch (error) {
            setAlert(messages.errors.handle);
        } finally {
            setLoading(false);
        }
    };

    const handleChangePass = async (data: IChangePassRequest, handleClose?: Function) => {
        try {
            setLoading(true);
            const response = await changePasswordCustomer(data);

            if (!response || response.code !== 200) {
                setAlert(response?.message || null);
                return;
            }

            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <ComfirmUiDefault
                            showCloseBtn={false}
                            onClose={onClose}
                            onOk={async () => {
                                await appService.handleLogout();

                                requestIdleCallback(() => {
                                    if (refetch) {
                                        refetch();
                                    }
                                });

                                router.push(links.home);
                            }}
                            title="Đổi mật khẩu thành công"
                            description="Vui lòng đăng nhập lại"
                        />
                    );
                },
            });
        } catch (error) {
            setAlert(messages.errors.handle);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = (setOpen: Function, reset: Function) => {
        setOpen(false);
        reset();

        if (alert) {
            setAlert(null);
        }
    };

    const validate = () => {
        const valid: boolean[] = [];
        if (!division.province) {
            formDivision.setError('province', { message: 'Bạn chưa chọn Tỉnh/Thành phố' });
            valid.push(true);
        }

        if (!division.district) {
            formDivision.setError('district', { message: 'Bạn chưa chọn Quận/Huyện' });
            valid.push(true);
        }
        if (!division.ward) {
            formDivision.setError('ward', { message: 'Bạn chưa chọn Xã/Phường' });
            valid.push(true);
        }

        return valid.length > 0;
    };

    const handleSetProvince = (item: IDropdownData<IProvince>) => {
        if (refDistrict.current && refDistrict.current.reset) {
            if (item.data?.province_id !== division.province?.province_id) {
                refDistrict.current.reset();
            }
        }

        setDivision({ ...division, province: item.data || null });
    };

    const handleSetDistrict = (item: IDropdownData<IDistrict>) => {
        if (refWard.current && refWard.current.reset) {
            if (item.data?.district_id !== division.district?.district_id) {
                refWard.current.reset();
            }
        }
        setDivision({ ...division, district: item.data || null });
    };

    return (
        <section className="max-w-[800px] md:max-w-[1320px] w-full p-4 m-auto">
            <div className=" flex flex-col items-center gap-8">
                <h1 className="text-lg font-semibold">Cài đặt</h1>

                <div className="flex flex-col w-full md:w-[640px] border shadow-lg rounded p-5 gap-5">
                    <div className="flex items-center gap-4 text-[16px] font-medium">
                        <span className="text-lg">
                            <AiOutlineUser />
                        </span>
                        <h2>Thông tin cá nhân</h2>
                    </div>

                    <div className="flex flex-col gap-2">
                        <SettingItem title="ID" data={user?.id} options={{ showIcon: false }} />

                        <SettingItem title="Tên đăng nhập" data={user?.username} options={{ showIcon: false }} />
                        <SettingItem onClick={handleOpenFullname} title="Họ và tên" data={user?.fullname} />
                        <SettingItem title="Email" data={user?.email} options={{ showIcon: false }} />
                        <SettingItem onClick={() => setOpenPhone(true)} title="Số điện thoại" data={user?.phone} />
                        <SettingItem onClick={() => setOpenDivision(true)} title="Địa chỉ" data={buildAddress(user)} />
                    </div>
                </div>

                <OrderInfo />

                <div className="flex flex-col w-full md:w-[640px] border shadow-lg rounded p-5 gap-5">
                    <div className="flex items-center gap-4 text-[16px] font-medium">
                        <span className="text-lg">
                            <AiFillSetting />
                        </span>
                        <h2>Cài đặt tài khoản</h2>
                    </div>

                    <div className="flex flex-col gap-2">
                        <SettingItem onClick={() => setOpenChangePassword(true)} title="Đặt lại mật khẩu" />

                        <SettingItem onClick={handleLogout} title="Đăng xuất" />
                    </div>
                </div>
            </div>
            {loading && <FullpageLoading />}

            {openFullname && (
                <ModalBase open={openFullname} setOpen={setOpenFullname}>
                    <ComfirmUiDefault
                        onOk={handleSubmit((value) => {
                            handleUpdate({ ...value }, () => {
                                setOpenFullname(false);
                                if (refetch) {
                                    refetch();
                                }
                            });
                        })}
                        onClose={() => {
                            handleClose(setOpenFullname, () => reset({ fullname: user?.fullname || '' }));
                        }}
                        title="Họ và tên"
                        options={{ closeWhenSubmit: false, cancelName: 'Hủy', okeName: 'Cập nhật' }}
                    >
                        <div className="w-[400px]">
                            <Input
                                message={errors.fullname?.message}
                                {...register('fullname', {
                                    required: 'Tên không được bỏ trống',
                                    minLength: {
                                        value: 10,
                                        message: 'Họ và tên quá ngắn',
                                    },
                                })}
                                title="Họ và tên"
                            />

                            {alert && (
                                <div className="w-full flex justify-center items-center mt-2 text-sm normal-case">
                                    <span className="text-heart">{alert}</span>
                                </div>
                            )}
                        </div>
                    </ComfirmUiDefault>
                </ModalBase>
            )}
            {openPhone && (
                <ModalBase open={openPhone} setOpen={setOpenPhone}>
                    <ComfirmUiDefault
                        onOk={formPhone.handleSubmit((value) => {
                            handleUpdate({ ...value }, () => {
                                setOpenPhone(false);
                                if (refetch) {
                                    refetch();
                                }
                            });
                        })}
                        onClose={() => {
                            handleClose(setOpenPhone, () => formPhone.reset({ phone: user?.phone || '' }));
                        }}
                        title="Số điện thoại"
                        options={{ closeWhenSubmit: false, cancelName: 'Hủy', okeName: 'Cập nhật' }}
                    >
                        <div className="w-[400px]">
                            <Input
                                message={formPhone.formState.errors.phone?.message}
                                {...formPhone.register('phone', {
                                    required: 'Số điện thoại không được trống',
                                    validate: (value) => {
                                        return Validate.isPhone(value) ? undefined : 'Số điện thoại không hợp lệ';
                                    },
                                })}
                                title="Số điện thoại"
                            />

                            {alert && (
                                <div className="w-full flex justify-center items-center mt-2 text-sm normal-case">
                                    <span className="text-heart">{alert}</span>
                                </div>
                            )}
                        </div>
                    </ComfirmUiDefault>
                </ModalBase>
            )}
            {openDivision && (
                <ModalBase open={openDivision} setOpen={setOpenDivision}>
                    <ComfirmUiDefault
                        onOk={formDivision.handleSubmit((value) => {
                            handleUpdate({ ...value }, () => {
                                setOpenDivision(false);
                                if (refetch) {
                                    refetch();
                                }
                            });
                        })}
                        onClose={() => {
                            handleClose(setOpenDivision, () =>
                                formDivision.reset({ province: user?.province || '', district: user?.district || '', ward: user?.ward || '', address: user?.address || '' }),
                            );
                        }}
                        title="Địa chỉ"
                        options={{ closeWhenSubmit: false, cancelName: 'Hủy', okeName: 'Cập nhật' }}
                    >
                        <div className="w-[400px] flex flex-col gap-4">
                            <DropdownProvince
                                message={formDivision.formState.errors.province?.message}
                                {...formDivision.register('province', {
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
                                search={formDivision.watch('province')}
                                setError={(message) => formDivision.setError('province', { message })}
                                setValue={(value) => formDivision.setValue('province', value)}
                                onClickItem={handleSetProvince}
                                label="Tỉnh/Thành phố"
                                flagRequired={true}
                            />

                            <DropdownDistrict
                                search={formDivision.watch('district')}
                                {...formDivision.register('district', {
                                    required: 'Vui lòng nhập Quận/Huyện',
                                    onChange: () => {
                                        setDivision({ ...division, district: null, ward: null });

                                        if (refWard.current && refWard.current.reset) {
                                            refWard.current.reset();
                                        }
                                    },
                                })}
                                message={formDivision.formState.errors.district?.message}
                                setValue={(value) => formDivision.setValue('district', value)}
                                setError={(message) => formDivision.setError('district', { message })}
                                onClickItem={handleSetDistrict}
                                refDropdown={refDistrict}
                                label="Quận/Huyện"
                                dependencyData={division.province}
                            />
                            <DropdownWard
                                {...formDivision.register('ward', {
                                    required: 'Vui lòng nhập Xã/Phường',
                                    onChange: () => {
                                        setDivision({ ...division, ward: null });
                                    },
                                })}
                                search={formDivision.watch('ward')}
                                setValue={(value) => formDivision.setValue('ward', value)}
                                setError={(message) => formDivision.setError('ward', { message })}
                                message={formDivision.formState.errors.ward?.message}
                                onClickItem={(item) => {
                                    setDivision({ ...division, ward: item.data || null });
                                }}
                                refDropdown={refWard}
                                dependencyData={division.district}
                                label="Xã/Phường"
                                flagRequired={true}
                            />

                            <Input
                                message={formDivision.formState.errors.address?.message}
                                {...formDivision.register('address', {
                                    required: 'Địa chỉ không được trống',
                                })}
                                label="Địa chỉ"
                            />

                            {alert && (
                                <div className="w-full flex justify-center items-center mt-2 text-sm normal-case">
                                    <span className="text-heart">{alert}</span>
                                </div>
                            )}
                        </div>
                    </ComfirmUiDefault>
                </ModalBase>
            )}

            {openChangePassword && (
                <ModalBase open={openChangePassword} setOpen={setOpenChangePassword}>
                    <ComfirmUiDefault
                        onOk={formChangePass.handleSubmit((value) => {
                            handleChangePass({ ...value }, () => {
                                setOpenChangePassword(false);
                            });
                        })}
                        onClose={() => {
                            handleClose(setOpenChangePassword, () => formChangePass.reset());
                        }}
                        title="Đổi mật khẩu"
                        options={{ closeWhenSubmit: false, cancelName: 'Hủy', okeName: 'Cập nhật' }}
                    >
                        <div className="w-[400px] flex-col flex gap-4">
                            <Input
                                message={formChangePass.formState.errors.password?.message}
                                {...formChangePass.register('password', {
                                    required: 'Mật khẩu hiện tại không được trống',
                                    minLength: {
                                        value: 6,
                                        message: 'Mật khẩu quá ngắn',
                                    },
                                })}
                                type="password"
                                label="Mật khẩu hiện tại"
                            />
                            <Input
                                message={formChangePass.formState.errors.newPass?.message}
                                {...formChangePass.register('newPass', {
                                    required: 'Mật khẩu mới không được trống',
                                    minLength: {
                                        value: 6,
                                        message: 'Mật khẩu quá ngắn',
                                    },
                                    validate: (value) => {
                                        if (value === formChangePass.getValues('password')) {
                                            return 'Mật khẩu cũ không giống mật khẩu mới';
                                        }
                                    },
                                })}
                                type="password"
                                label="Mật khẩu mới"
                            />
                            <Input
                                message={formChangePass.formState.errors.comfirmPass?.message}
                                {...formChangePass.register('comfirmPass', {
                                    required: 'Xác nhận không được trống',
                                    minLength: {
                                        value: 6,
                                        message: 'Mật khẩu quá ngắn',
                                    },
                                    validate: (value) => {
                                        if (formChangePass.getValues('newPass') !== value) return 'Xác nhận mật khẩu không chính xác';
                                    },
                                })}
                                label="Xác nhận mật khẩu"
                                type="password"
                            />

                            {alert && (
                                <div className="w-full flex justify-center items-center mt-2 text-sm normal-case">
                                    <span className="text-heart">{alert}</span>
                                </div>
                            )}
                        </div>
                    </ComfirmUiDefault>
                </ModalBase>
            )}
        </section>
    );
}
