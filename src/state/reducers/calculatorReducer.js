export const UPDATE_DCA_CALCULATOR = 'UPDATE_DCA_CALCULATOR'
export const UPDATE_HISTORICAL_DATA = 'UPDATE_HISTORICAL_DATA'


  const convertDate = (x) => {
    const theDate = new Date(x);
    return theDate.toLocaleDateString();
  };

export const initialCalculators = {

    // DOLLAR COST AVERAGE CALCULATOR
    dca: {
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
            },

        historicalData: [],

        dataTable: function(){

            // let calculated = [{
            //     date: '',
            //     price: 0,
            //     bitcoinAdded: 0,
            //     runningBal: 0,
            //     totalInvested: 0,
            //     roi: 0,
            //     profit: 0
            // }]

            let calculated = []
            let runningBal = 0
            let totalInvested = 0

            this.historicalData.forEach(item => {
                let date = convertDate(item.date)
                const bitcoinAdded = Number((this.purchaseAmount / item.price).toFixed(8))
                runningBal = runningBal + bitcoinAdded
                totalInvested = Number(totalInvested) + Number(this.purchaseAmount)
                const value = Number((item.price * runningBal).toFixed(2));
                const profit = value - totalInvested;
                const roi = ((value - totalInvested) / totalInvested) * 100;

                calculated.push({
                    date: date,
                    price: item.price,
                    bitcoinAdded: bitcoinAdded,
                    runningBal: runningBal.toFixed(8),
                    value: value,
                    totalInvested: totalInvested,
                    roi: `${roi.toFixed(2)}%`,
                    profit: Math.round(profit),
                })
                })

                return calculated
            },
            
        lastEntry: function(){
            const length = this.dataTable().length
            const latest = this.dataTable()[length - 1]
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
                const data = action.payload

                const histData = [];

                data.forEach((item) => {
                    let friendlyDate = item[0]

                    const price = Math.round(item[1]);

                    histData.push({
                        date: friendlyDate,
                        price: price,
                    })
                })
                    
                return {
                    ...state,
                    dca: {
                        ...state.dca,
                        historicalData: histData
                    }
                }
            
            default:
                return state
            }
    }