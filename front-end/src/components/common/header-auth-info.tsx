import { Button, Icon } from "semantic-ui-react"
import { ButtonPrimary } from "../button/button-primary"
import { Link } from "react-router-dom";
import { authStore } from "@stores/auth-store";
import toast from "react-hot-toast";
import { useCallback } from "react";
export interface HeaderAuthInfo {
    className?: string
}
export function HeaderAuthInfo({ className = "" }: HeaderAuthInfo) {
    const { isAuth, user, logout } = authStore();
    const logoutToast = useCallback(async () => {
        await logout();
        toast.success("Logout succees")
    }, [])
    if (!isAuth) return null;

    return <div className={` ${className}`}>

        {/* For desktop device */}
        <div className="hidden md:flex flex-row gap-3 justify-center items-center">
            <p>Welcome to <span className="font-bold first-letter:uppercase">{user?.email}</span></p>
            <Link to="/video/sharing">
                <ButtonPrimary>Share a movie</ButtonPrimary>
            </Link>
            <ButtonPrimary onClick={logoutToast}>Logout</ButtonPrimary>
        </div>
        {/* For mobile device */}
        <div className="flex flex-row gap-2 md:hidden">
            <Link to="/video/sharing">
                <Button className="!bg-youtube-primary hover:grayscale-[20%] shadow-md" icon >
                    <Icon name="share" className=" text-white" />
                </Button>
            </Link>
            <Button onClick={logoutToast} className="!bg-youtube-primary hover:grayscale-[20%] shadow-md" icon >
                <Icon name="sign out" className=" text-white" />
            </Button>
        </div>
    </div>
}