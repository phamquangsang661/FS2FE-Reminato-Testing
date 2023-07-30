
import {
    RouterProvider
} from "react-router-dom";
import { routers } from "../router";
import { Toaster } from "react-hot-toast";

export function Provider() {
    return <>
        <RouterProvider router={routers} />
        <Toaster
            position="top-center"
        />
    </>
}