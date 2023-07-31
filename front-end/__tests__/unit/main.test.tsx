import { render, screen } from '@testing-library/react'
import { RouterProvider } from 'react-router-dom'

import { routers } from '@router/index'

describe("Main", () => {
    it("Runnable", () => {

        const { container } = render(
            <RouterProvider router={routers} />
        )
        screen.debug()
        expect(container).not.toBeEmptyDOMElement()

    })
})