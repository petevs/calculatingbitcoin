import { GET_DATA, UPDATE_DAILY_PRICES, UPDATE_TIME_FRAME } from '../reducers/marketDataReducer'

export const setMarketData = (data) => {
    return { type: GET_DATA, payload: data}
}

export const updateDailyPrices = (data) => {
    return { type: UPDATE_DAILY_PRICES, payload: data}
}

export const updateTimeFrame = (data) => {
    return { type: UPDATE_TIME_FRAME, payload: data}
}