import '../assets/css/global.css'
import { Toaster } from "react-hot-toast";
import {  useEffect } from "react";
import { authStore } from "@stores/auth-store";
import { ProviderNotification } from "./provider-notification";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

export interface Provider {

    router: ReturnType<typeof createBrowserRouter>
}
export function Provider({ router }: Provider) {
    const { refresh, isDone, isAuth } = authStore();


    useEffect(() => {
        refresh()
    }, [])
    if (!isDone) return null;

    return <>
        {isAuth &&
            <ProviderNotification />
        }
        <RouterProvider router={router} />
        <Toaster
            position="top-center"
        />
    </>
}