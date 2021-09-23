import { UPDATE_DCA_CALCULATOR, UPDATE_HISTORICAL_DATA } from "state/reducers/calculatorReducer"


export const updateDcaCalculator = (data) => {
    return { type: UPDATE_DCA_CALCULATOR, payload: data}
}
export const updateDcaHistoricalData= (data) => {
    return { type: UPDATE_HISTORICAL_DATA, payload: data}
}