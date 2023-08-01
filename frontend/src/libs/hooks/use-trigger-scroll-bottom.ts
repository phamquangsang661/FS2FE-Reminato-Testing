import { RefObject, useEffect } from "react";

export function useTriggerScrollBottom(
    ref: RefObject<HTMLElement>,
    callback: () => Promise<void> | void = () => { }
) {

    useEffect(() => {
        const trackScrolling = () => {

            if (ref.current &&
                ref.current.getBoundingClientRect().bottom <= window.innerHeight) {
                callback()
            }
        }
        document.addEventListener('scroll', trackScrolling);
        return () => {
            document.removeEventListener("scroll", trackScrolling)
        }
    }, [ref])
    return { ref }
}
