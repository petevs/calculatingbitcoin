import { GET_DATA } from '../reducers/marketDataReducer'

export const setMarketData = (data) => {
    return { type: GET_DATA, payload: data}
}