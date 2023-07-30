
import {
    RouterProvider
} from "react-router-dom";
import { routers } from "../router";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { authStore } from "@stores/auth-store";

export function Provider() {
    const { refresh } = authStore()
    useEffect(() => {
        refresh()
    }, [])
    return <>
        <RouterProvider router={routers} />
        <Toaster
            position="top-center"
        />
    </>
}