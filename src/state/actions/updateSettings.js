import { UPDATE_BROWSER_WIDTH, UPDATE_SETTINGS, UPDATE_DRAWER_OPEN } from '../reducers/userReducer'

export const updateSettings = (data) => {
    return { type: UPDATE_SETTINGS, payload: data }
}

export const updateBrowserWidth = (data) => {
    return { type: UPDATE_BROWSER_WIDTH, payload: data}
}

export const updateDrawerOpen = (data) => {
    return { type: UPDATE_DRAWER_OPEN, payload: data}
}