import { IOrder, ISize, IUser } from '../../interface';

export const max_size = 1024 * 1024 * 2;
export const max_files = 6;

export const toCurrency = (price: number): string => {
    if (price >= 1000000000) {
        return price / 1000000000 + ' tỷ';
    }

    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(price);
};

export const calaculateDiscount = (price: number, discount: number) => {
    return price * (1 - discount / 100);
};

export const formatNumber = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    })
        .format(price)
        .replace('₫', '');
};

export const totalQuantities = (sizes: ISize[]) => {
    return sizes.reduce((value, cur) => {
        return (value += cur.price);
    }, 0);
};

export function removeFalsyValues(obj: Record<string, any>): Record<string, any> {
    const newObj: Record<string, any> = {};
    for (const key in obj) {
        if (obj[key]) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}

export function removeDuplicates(arr1: string[], arr2: string[]): string[] {
    // Create an empty array to store unique elements
    let uniqueArray: string[] = [];

    // Iterate through each element in arr1
    arr1.forEach((item) => {
        // Check if the current element is not present in arr2
        if (!arr2.includes(item)) {
            // If not present, push it to the uniqueArray
            uniqueArray.push(item);
        }
    });

    // Iterate through each element in arr2
    arr2.forEach((item) => {
        // Check if the current element is not present in arr1
        if (!arr1.includes(item)) {
            // If not present, push it to the uniqueArray
            uniqueArray.push(item);
        }
    });

    return uniqueArray;
}

// tao keywords cho displayName, su dung cho search
export const generateKeywords = (displayName: string) => {
    // liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
    // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
    const name = displayName.split(' ').filter((word) => word);

    const length = name.length;
    let flagArray: any[] = [];
    let result: string[] = [];
    let stringArray: string[] = [];

    /**
     * khoi tao mang flag false
     * dung de danh dau xem gia tri
     * tai vi tri nay da duoc su dung
     * hay chua
     **/
    for (let i = 0; i < length; i++) {
        flagArray[i] = false;
    }

    const createKeywords = (name: any) => {
        const arrName: any = [];
        let curName = '';
        name.split('').forEach((letter: any) => {
            curName += letter;
            arrName.push(curName);
        });
        return arrName;
    };

    function findPermutation(k: any) {
        for (let i = 0; i < length; i++) {
            if (!flagArray[i]) {
                flagArray[i] = true;
                result[k] = name[i];

                if (k === length - 1) {
                    stringArray.push(result.join(' '));
                }

                findPermutation(k + 1);
                flagArray[i] = false;
            }
        }
    }

    findPermutation(0);

    const keywords = stringArray.reduce((acc: any, cur) => {
        const words = createKeywords(cur);
        return [...acc, ...words];
    }, []);

    return keywords;
};

export const buildAddress = (user?: IUser | null) => {
    if (!user || !user.address || !user.province || !user.district || !user.ward) return null;
    return `${user.address}, ${user.ward}, ${user.district}, ${user.province}`;
};
export const buildAddressOrder = (data?: IOrder | null) => {
    if (!data || !data.address || !data.province || !data.district || !data.ward) return null;
    return `${data.address}, ${data.ward}, ${data.district}, ${data.province}`;
};
