import { ReactNode } from "react"
import { PAGE_ASSETS } from "../../constants/page";
import { Header } from "./header";
import { BackToTop } from "../back-to-top";

export interface Layout {
    children: ReactNode;
    title?: string;
    content?: string;
    faviconUrl?: string;
    mainClassName?: string;
    className?: string;
    activePage?: string
}

export function Layout({
    title = "Default",
    content = "Default page",
    children,
    mainClassName = "",
    className = "",
    faviconUrl = PAGE_ASSETS.FAVICON_URL }: Layout) {

    return <>
        <head>
            <title>{title}</title>
            <meta name="description" content={content} />
            <link rel="icon" href={faviconUrl} />
        </head>
        <main className={`flex min-h-screen flex-col items-center justify-center ${mainClassName}`}>
            <Header />
            <div className={`flex-grow  ${className}`}>
                {children}
            </div>
            <BackToTop />
        </main>
    </>

}