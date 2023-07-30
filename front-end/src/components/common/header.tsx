import { Button, Icon, Popup } from "semantic-ui-react"
import { FormHeaderLogin } from "../form"
import { ModalMobileLogin } from "../modal/modal-mobile-login"
import { usePopup } from "../../libs/hooks"
import { HeaderAuthInfo } from "./header-auth-info"
import { Link } from "react-router-dom"

export interface Header {
    className?: string
}
export function Header({ className = "" }: Header) {
    const popupModalLoginHook = usePopup()
    return <nav className={` border-b-[3px] bg-white sticky top-0 border-b-red-600 flex flex-row justify-between items-center
    py-3 px-5 md:px-10 w-[90%]
    ${className}`}>
        <Link to="/">
            <div className="flex flex-row gap-1 items-center ">
                <Icon size="huge" className="text-youtube-primary" name="video play"></Icon>
                <h1 className="font-primary text-[24px]"> Funny Movies</h1>
            </div>
        </Link>

        <div className="flex flex-row gap-1">
            {/* <HeaderAuthInfo /> */}
            {/* Not Auth */}
            <FormHeaderLogin className="!hidden md:!block" />
            <ModalMobileLogin {...popupModalLoginHook} className="!block md:!hidden" />
            <Popup content='Refresh your feed' trigger={<Button className="!bg-youtube-primary hover:grayscale-[20%] shadow-md" icon >
                <Icon name="refresh" className=" text-white"/>
            </Button>} />
        </div>
    </nav>
}