interface IUser {
    id: string;
    fullname: string | null;
    username: string;
    createdAt?: string;
    phone: null | string;
    email: string;
    province: null | string;
    district: null | string;
    ward: null | string;
    address: null | string;
}

interface IBaseApi<T> {
    message: string;
    data: T;
    status: boolean;
    code: number;
}

interface IPagination<T> {
    items: T[];
    meta: {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    };
}

interface IRowCollection {
    id: number;
    title: string;
    image: string;
    user: User;
    createdAt: string;
}

interface IDropdownData<T> {
    id: string;
    name: string;
    createdAt?: string;
    data?: T;
}

interface IImageProduct {
    id: number | string;
    name: string;
    file?: File | null;
    createAt: string;
}

interface ISize {
    createdAt: string;
    id: number | string;
    name: string;
    price: number;
    store: number;
    discount: number;
    product?: IDProduct;
}

interface IDProduct {
    createdAt: string;
    id: string;
    name: string;
    description: string;
    showSize: boolean;
    sizes: ISize[];
    images: IImageProduct[];
    category: IDropdownData;
}

interface IRefChildImages {
    reset?: () => void;
    init?: (data: IImageProduct[]) => void;
}

interface IFilter {
    search?: string;
    page?: number;
    deleted?: boolean | string;
    limit?: number;
    sort?: string;
}

interface IFilterProduct extends IFilter {
    categories?: number;
    size?: string;
    min?: number;
    max?: number;
    deleted?: boolean;
}

interface IFilterOrder extends IFilter {
    min?: string;
    max?: string;
    state?: string;
}

interface IOrder {
    createdAt: string;
    id: number;
    uuid: string;
    fullname: string;
    phone: string;
    email: string;
    province: string;
    district: string;
    ward: string;
    address: string;
    description: string;
    customer: Customer;
    detail: IDetailInfoOrder | null;
    state: 'pending' | 'delivered' | 'refunded';
}

interface IDOrder extends IOrder {
    data: IOrderDetail[];
    detail: IDetailInfoOrder | null;
}

interface Customer {
    createdAt: string;
    id: string;
    username: string;
    phone: string | null;
    email: string | null;
}

export interface IOrderDetail {
    createdAt: string;
    id: number;
    price: number;
    discount: number;
    quantity: number;
    size: ISize;
}

interface IRefOders {
    pagination?: IPagination<IOrder>['meta'];
}

export interface IDetailInfoOrder {
    createdAt: string;
    id: number;
    payAt: string | null;
    cancel: boolean;
    reason: string | null;
    read: boolean;
    print: number;
}

interface IChartSeri {
    name: string;
    data: number[];
}

interface IDCustomer {
    createdAt: string;
    id: string;
    username: string;
    phone: string;
    email: string;
    province: string | null;
    ward: string | null;
    address: string | null;
    district: string | null;
}

interface IAdmin {
    createdAt: string;
    id: string;
    username: string;
    fullname: string;
    authorizations: IAuthorization[];
}

interface IAuthorization {
    createdAt: string;
    id: number | string;
    role: IRole;
}

interface IRole {
    createdAt: string;
    id: number | string;
    name: string;
    description: string;
}

interface IRefRolesHandle {
    reset?: () => void;
}

export interface IChartsDashborad {
    budget?: IChartCard;
    cutomers?: IChartCard;
    tasks?: IChartCard;
    totalProfit?: IChartCard;
    charts?: IChartSeri[];
}

export interface IChartCard {
    value: number;
    evolution: number;
}

interface ICartData extends Pick<IDProduct, 'id' | 'category' | 'images' | 'showSize' | 'name'> {
    size: ISize;
    quantity: number;
    checked?: boolean;
}

interface IDivision<T> {
    results: T[];
}

interface IProvince {
    province_id: string;
    province_name: string;
    province_type: string;
}

interface IDistrict {
    district_id: string;
    district_name: string;
    district_type: string;
    lat: any;
    lng: any;
    province_id: string;
}
interface IWard {
    district_id: string;
    ward_id: string;
    ward_name: string;
    ward_type: string;
}

interface IRefDropdown {
    setMessage?: (message: string) => void;
    reset?: () => void;
}

interface IErrorDivision {
    district: string;
    province: string;
    ward: string;
}

interface IOrderInfo {
    fullname: string;
    email: string;
    phone: string;
    province: string;
    district: string;
    ward: string;
    address: string;
    description: string | null;
}

interface IOrderRequest {
    info: IOrderInfo;
    data: ICartData[];
}

interface ICustomerRequest {
    fullname?: string;
    phone?: string;
    province?: string;
    district?: string;
    ward?: string;
}

interface IChangePassRequest {
    password: string;
    newPass: string;
    comfirmPass: string;
}
