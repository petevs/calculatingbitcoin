import { UPDATE_CURRENCY } from '../reducers/userReducer'

export const updateCurrency = (data) => {
    return { type: UPDATE_CURRENCY, payload: data }
}