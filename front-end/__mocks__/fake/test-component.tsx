import { forwardRef } from "react"

export function TestComponent() {
    return <div>TESTING COMPONENT</div>
}

export const TestComponentForwardRef = forwardRef<HTMLDivElement>((_props, ref ) => {
    {
        return <div ref={ref}>TESTING COMPONENT</div>
    }
}) 