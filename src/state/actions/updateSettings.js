import { UPDATE_BROWSER_WIDTH, UPDATE_SETTINGS } from '../reducers/userReducer'

export const updateSettings = (data) => {
    return { type: UPDATE_SETTINGS, payload: data }
}

export const updateBrowserWidth = (data) => {
    return { type: UPDATE_BROWSER_WIDTH, payload: data}
}