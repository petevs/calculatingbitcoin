import { UPDATE_DCA_CALCULATOR } from "state/reducers/calculatorReducer"


export const updateDcaCalculator = (data) => {
    return { type: UPDATE_DCA_CALCULATOR, payload: data}
}