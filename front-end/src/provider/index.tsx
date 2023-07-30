
import {
    RouterProvider
} from "react-router-dom";
import { routers } from "../router";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { authStore } from "@stores/auth-store";
import { ProviderNotification } from "./provider-notification";

export function Provider() {
    const { refresh, isDone } = authStore();

    useEffect(() => {
        refresh()
    }, [])
    if (!isDone) return null;

    return <>
        <ProviderNotification>
            <RouterProvider router={routers} />
            <Toaster
                position="top-center"
            />
        </ProviderNotification>
    </>
}