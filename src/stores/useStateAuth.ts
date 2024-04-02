import { create } from 'zustand';
import { IUser } from '../../interface';

interface IStateAuth {
    user: null | IUser;
    setUser: (user: IUser) => void;
}

export const useAuthStore = create<IStateAuth>()((set) => ({
    user: null,
    setUser: (user) => set((state) => ({ user: user })),
}));
