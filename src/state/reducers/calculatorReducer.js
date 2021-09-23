export const UPDATE_DCA_CALCULATOR = 'UPDATE_DCA_CALCULATOR'

export const initialCalculators = {

    // DOLLAR COST AVERAGE CALCULATOR
    dca: {
        inputs: {
            purchaseAmount: 5,
            startDate: '2021-01-01',
            today: function(){
                let todayDate = new Date()
                todayDate = todayDate.toISOString().split("T")[0]
                return todayDate
            },
            timeBetween: function(){
                const today = new Date();
                const start = new Date(this.startDate);

                const diff_in_time = today.getTime() - start.getTime();
                const diff_in_days = diff_in_time / (1000 * 3600 * 24);

                return Math.round(diff_in_days);
            }
        },
        data: {
            historicalDate: []
        },
        calculations: {

        }
    }
}

export const calculatorReducer = (state, action) => {
    switch(action.type){
        case UPDATE_DCA_CALCULATOR:
            return {
                ...state,
                dca: {
                    ...state.dca,
                    inputs: {
                        ...state.dca.inputs,
                        [action.payload.name]: action.payload.value,
                    }
                }
            }
            default:
                return state
        }
    }