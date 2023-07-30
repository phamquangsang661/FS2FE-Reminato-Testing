import { Button, Icon } from "semantic-ui-react"
import { ButtonPrimary } from "../button/button-primary"
import { Link } from "react-router-dom";
export interface HeaderAuthInfo {
    className?: string
}
export function HeaderAuthInfo({ className = "" }: HeaderAuthInfo) {
    return <div className={` ${className}`}>

        {/* For desktop device */}
        <div className="hidden md:flex flex-row gap-3 justify-center items-center">
            <p>Welcom to test@gmail.com</p>
            <Link to="/video/sharing">
                <ButtonPrimary>Share a movie</ButtonPrimary>
            </Link>
            <ButtonPrimary>Logout</ButtonPrimary>
        </div>
        <div className="flex flex-row gap-2 md:hidden">
            <Link to="/video/sharing">
                <Button className="!bg-youtube-primary hover:grayscale-[20%] shadow-md" icon >
                    <Icon name="share" className=" text-white" />
                </Button>
            </Link>

            <Button className="!bg-youtube-primary hover:grayscale-[20%] shadow-md" icon >
                <Icon name="sign out" className=" text-white" />
            </Button>
        </div>
        {/* For mobile device */}
    </div>
}