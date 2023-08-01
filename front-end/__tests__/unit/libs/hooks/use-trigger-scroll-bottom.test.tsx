import { act, fireEvent, render, renderHook, waitFor } from "@testing-library/react";
import { useRef } from "react";
import { useTriggerScrollBottom } from "../../../../src/libs/hooks/use-trigger-scroll-bottom";
import { TestComponentForwardRef } from "__mocks__/fake/test-component";

describe("Libs/hooks trigger scroll bottom", () => {
    it.todo("Trigger callback when scroll bottom", async () => {
        const callbackSpy = vi.fn();
        const ref = renderHook(() => useRef<HTMLDivElement>(null));
        const { container } = render(<TestComponentForwardRef
            ref={ref.result.current} />)
        //Trigger rerender ref


        const hook = renderHook(() =>
            useTriggerScrollBottom(ref.result.current, callbackSpy)
        )

        act(() => {
            hook.rerender()
        })

        // Fake trigger to the end
        await fireEvent.scroll(container, { target: { scrollTop: 1000 } });

        // Not work as expect, Should try Cypress?
        await waitFor(() => {
            expect(callbackSpy).toBeCalledTimes(1)
        })

    })
})