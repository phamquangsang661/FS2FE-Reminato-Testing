import { API_URL } from "../constants/api-url";
import api from "@utils/api";

type VideoSharing = {
    data: {
        url: string
    }
}

export async function videoSharing(ctx: VideoSharing) {
    return await api.post(API_URL.VIDEO.SHARE, ctx.data)
}

type VideoGetVideos = {
    query: {
        limit?: string;
        cursor?: string
    }
}

export async function videoGetVideos(ctx: VideoGetVideos) {
    const urlParams = new URLSearchParams(ctx.query);
    [...urlParams.entries()].forEach(([key, value]) => {
        console.log(key,value)
        if (!value || value==undefined || value=="undefined") {
            urlParams.delete(key);
        }
    });
    const cleaned = String(urlParams);
    return await api.get(API_URL.VIDEO.VIDEOS.GETS + `${cleaned != "" ? "?" + cleaned : ""}`)
}