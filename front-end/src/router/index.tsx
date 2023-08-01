import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import { Home } from "@pages/index"
import { SharingPage } from "@pages/video/sharing";
import { ProtectedRoute } from "./protected";
import { NotFound } from "@pages/NotFound";

export const routers = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<Home />} />
        <Route path="/video/sharing" element={
            <ProtectedRoute>
                <SharingPage />
            </ProtectedRoute>
        } />
        <Route path='*' element={<NotFound />}/>
    </>
))