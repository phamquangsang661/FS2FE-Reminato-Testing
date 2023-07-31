import * as zustand from 'zustand'
import { act } from '@testing-library/react'
import { vi } from 'vitest'
vi.mock('zustand')

const actualCreate = vi.mocked(zustand).create

export const storeResetFns = new Set<() => void>()

// when creating a store, we get its initial state, create a reset function and add it in the set
export const create = (<T>() => {
    return (stateCreator: zustand.StateCreator<T>) => {
        const store = actualCreate(stateCreator)
        const initialState = store.getState()
        storeResetFns.add(() => {
            store.setState(initialState, true)
        })
        return store
    }
}) as typeof zustand.create

// reset all stores after each test run, Run in after each
export function resetZustandStoreMock() {
    return act(() => {
        storeResetFns.forEach((resetFn) => {
            resetFn()
        })
    })
}
