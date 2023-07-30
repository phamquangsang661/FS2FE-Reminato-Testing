
import {
    RouterProvider
} from "react-router-dom";
import { routers } from "../router";

export function Provider() {
    return <RouterProvider router={routers} />
}