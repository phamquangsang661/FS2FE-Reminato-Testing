import { API_URL } from "../constants/api-url";
import api from "@utils/api";

type VideoSharing={
    data:{
       url:string
    }
}

export async function videoSharing(ctx:VideoSharing){
    return await api.post(API_URL.VIDEO.SHARE,ctx.data)
}

