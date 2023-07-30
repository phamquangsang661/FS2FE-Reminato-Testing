import { authGetMe, authLogout, authVerifyToken } from '@services/auth';
import { create } from 'zustand'

type AuthStore = {
    user: UserSimpleInfo | null;
    isAuth: boolean;
    isCompleted: boolean;
    isErrored: boolean;
    setAuth: (user: UserSimpleInfo) => void;
    logout: () => Promise<void>;
    refresh: () => Promise<void>;
    fetchUser: () => Promise<UserSimpleInfo|null>;
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
            // First time
            if(!state.isAuth){
                state.user=await state.fetchUser();
            }
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
    fetchUser:async()=>{
        try{
            const res= await authGetMe();
            return res.data.data as UserSimpleInfo
        }catch{
            return null
        }
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
