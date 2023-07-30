import { API_URL } from "../constants/api-url";
import api from "@utils/api";

type AuthSignIn={
    data:{
        email:string;
        password:string
    }
}

export async function authSignIn(ctx:AuthSignIn){
    return await api.post(API_URL.AUTH.SIGN_IN,ctx.data)
}

export async function authLogout(){
    return await api.put(API_URL.AUTH.LOGOUT,{})
}

export async function authVerifyToken(){
    return await api.get(API_URL.AUTH.VERIFY.TOKEN)
}