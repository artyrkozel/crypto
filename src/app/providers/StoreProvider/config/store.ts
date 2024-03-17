import { configureStore } from "@reduxjs/toolkit"
import { StateSchema } from "./StateSchema"

export const createReduxStore = (initialState?: StateSchema) => {
    return configureStore<StateSchema>({
        reducer: {},
        preloadedState: initialState
    })
}