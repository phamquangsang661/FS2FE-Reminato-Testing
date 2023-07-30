import {
    createBrowserRouter,
    RouteObject,
} from "react-router-dom";

import { Home } from "@pages/index"

export const routers = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    }
] as RouteObject[])