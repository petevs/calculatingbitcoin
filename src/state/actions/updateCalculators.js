import { UPDATE_DCA_CALCULATOR, UPDATE_HISTORICAL_DATA } from "state/reducers/calculatorReducer"
import { UPDATE_BTD_INPUTS, UPDATE_BTD_PRICE_HISTORY, UPDATE_BTD_CHART_TYPE } from "state/reducers/btdReducer"
import { UPDATE_TRADE_DATA, UPDATE_TRADE_BUYBACK } from "state/reducers/tradeReducer"


export const updateDcaCalculator = (data) => {
    return { type: UPDATE_DCA_CALCULATOR, payload: data}
}
export const updateDcaHistoricalData= (data) => {
    return { type: UPDATE_HISTORICAL_DATA, payload: data}
}

export const updateBtdPriceHistory = (data) => {
    return { type: UPDATE_BTD_PRICE_HISTORY, payload: data}
}

export const updateBtdInputs = (data) => {
    return { type: UPDATE_BTD_INPUTS, payload: data}
}

export const updateBtdChartType = (data) => {
    return { type: UPDATE_BTD_CHART_TYPE, payload: data}
}

export const updateTradeData = (data) => {
    return { type: UPDATE_TRADE_DATA, payload: data}
}

export const updateTradeBuyback = (data) => {
    return { type: UPDATE_TRADE_BUYBACK, payload: data}
}