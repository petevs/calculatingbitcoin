import { UPDATE_DCA_CALCULATOR, UPDATE_HISTORICAL_DATA } from "state/reducers/calculatorReducer"
import { UPDATE_BTD_INPUTS, UPDATE_BTD_PRICE_HISTORY } from "state/reducers/btdReducer"


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