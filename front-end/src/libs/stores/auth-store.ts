import { authLogout, authVerifyToken } from '@services/auth';
import { create } from 'zustand'

type AuthStore = {
    user: UserSimpleInfo | null;
    isAuth: boolean;
    isCompleted: boolean;
    isErrored: boolean;
    setAuth: (user: UserSimpleInfo) => void;
    logout: () => Promise<void>
    refresh: () => Promise<void>
};

export const authStore = create<AuthStore>((set, get) => ({
    user: null,
    isAuth: false,
    isCompleted: false,
    isErrored: false,
    refresh: async () => {
        const state = { ...get() };
        try {
            await authVerifyToken();
            state.isAuth = true;
            state.isCompleted = true;
        } catch(err) {
            console.log(err)
            state.isAuth = false;
            state.isErrored = true;
            state.isCompleted = false;
        }
        set(state)
    },
    setAuth: (user: UserSimpleInfo) => set((state) => {
        return {
            ...state,
            user,
            isAuth: true,
            isLoading: false,
            isCompleted: true,
            isErrored: false
        };
    }),
    logout: async () => {
        await authLogout();
        set((state) =>
        ({
            ...state,
            user: null,
            isAuth: false,
            isLoading: false,
            isCompleted: false,
            isErrored: false
        }))
    },
}));
