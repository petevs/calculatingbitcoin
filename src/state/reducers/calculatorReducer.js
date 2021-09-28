import moment from 'moment'

export const UPDATE_DCA_CALCULATOR = 'UPDATE_DCA_CALCULATOR'
export const UPDATE_HISTORICAL_DATA = 'UPDATE_HISTORICAL_DATA'



export const initialCalculators = {
    // DOLLAR COST AVERAGE CALCULATOR
    dca: {
        purchaseAmount: 5,
        startDate: '2021-01-01',
        historicalData: [],
        calculatedData: function(){

            const dataLength = this.historicalData.length

            if(dataLength < 1){
                return null
            }

            const today = moment()
            const startDate = moment(this.startDate)

            const daysDiff = today.diff(startDate, 'days')

            const startIndex = dataLength - daysDiff - 1

            let runningBal = 0
            let totalInvested = 0

            const calculatedValues = this.historicalData.slice(startIndex).map(item => {
                const friendlyDate = moment(item[0]).format('YYYY-MM-DD')
                const price = item[1]

                totalInvested = Number(totalInvested) + Number(this.purchaseAmount)
                const bitcoinAdded = Number((this.purchaseAmount / price))
                runningBal = runningBal + bitcoinAdded
                const value = Number((price * runningBal).toFixed(2));
                const profit = value - totalInvested;
                const roi = ((value - totalInvested) / totalInvested) * 100;

                return {
                    date: friendlyDate,
                    price: Math.round(price),
                    totalInvested: Math.round(totalInvested),
                    runningBal: runningBal.toFixed(8),
                    value: Math.round(value),
                    profit: Math.round(profit),
                    roi: roi.toFixed(2),
                    days: daysDiff
                }
            })

            return calculatedValues

        },
        lastEntry: function(){
            const length = this.calculatedData().length
            const latest = this.calculatedData()[length - 1]
            let averageCost = 0
            if(latest){
                averageCost = Math.round(Number(latest.totalInvested) / Number(latest.runningBal))
            }

            return {
                ...latest,
                averageCost: averageCost
            }
            },
        }

}

export const calculatorReducer = (state, action) => {
    switch(action.type){
        case UPDATE_DCA_CALCULATOR:
            return {
                ...state,
                dca: {
                    ...state.dca,
                    [action.payload.name]: action.payload.value,
                    }
                }
            case UPDATE_HISTORICAL_DATA:
                return {
                    ...state,
                    dca: {
                        ...state.dca,
                        historicalData: action.payload
                    }
                }
            
            default:
                return state
            }
    }