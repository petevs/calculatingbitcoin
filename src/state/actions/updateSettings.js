import { UPDATE_SETTINGS } from '../reducers/userReducer'

export const updateSettings = (data) => {
    return { type: UPDATE_SETTINGS, payload: data }
}