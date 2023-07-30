
import {
    RouterProvider
} from "react-router-dom";
import { routers } from "../router";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { authStore } from "@stores/auth-store";

export function Provider() {
    const { refresh, isDone } = authStore();

    useEffect(() => {
        refresh()
    }, [])
    if (!isDone) return null;
    
    return <>
        <RouterProvider router={routers} />
        <Toaster
            position="top-center"
        />
    </>
}