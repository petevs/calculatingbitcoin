import moment from 'moment'

export const UPDATE_BTD_PRICE_HISTORY = "UPDATE_BTD_PRICE_HISTORY"
export const UPDATE_BTD_INPUTS = "UPDATE_BTD_INPUTS"
export const UPDATE_BTD_CHART_TYPE = "UPDATE_BTD_CHART_TYPE"

export const initialBtd = {
    dipPercentage: 5,
    purchaseAmount: 500,
    priceHistory: [],
    startDate: '2021-01-01',
    startIndex: function(){
        //If price history has not loaded return empty array
        if(this.priceHistory.length < 1){
            return 0
        }

        //Get starting index of price history
        const today = moment()
        const days = today.diff(moment(this.startDate), 'days')
        const startIndex = this.priceHistory.length - days - 2

        return startIndex

    },
    calculatedBtd: function(){

        //If price history has not loaded return empty array
        if(this.priceHistory.length < 1){
            return []
        }

        //Set starting price and balance
        let previousDayPrice = this.priceHistory.slice(this.startIndex())[0][1]
        let runningBal = 0
        let totalInvested = 0
        let numberOfDips = 0

        // Loop through prices and if price dip lower than set amount buy
        const transactionTable = this.priceHistory.slice(this.startIndex() + 1).map(item => {
            
            const todayPrice = item[1]
            const percentDiff = (todayPrice - previousDayPrice) / previousDayPrice * 100
            let btcPurchased = 0

            if(percentDiff < this.dipPercentage * -1){
                btcPurchased = (this.purchaseAmount / todayPrice).toFixed(8)
                totalInvested = totalInvested + this.purchaseAmount
                numberOfDips = numberOfDips + 1
            }
            
            runningBal = (Number(runningBal) + Number(btcPurchased)).toFixed(8)
            const value = Math.round(Number(runningBal) * Number(todayPrice))
            previousDayPrice = todayPrice

            const roi = (value - totalInvested) / totalInvested * 100

            return {
                date: item[0],
                price: item[1],
                percentDiff: percentDiff,
                btcPurchased: btcPurchased,
                runningBal: Number(runningBal),
                value: value,
                totalInvested: totalInvested,
                numberOfDips: numberOfDips,
                roi: roi.toFixed(2)
            }
        })

        return transactionTable
    },
    lastEntry: function(){
        let initial = {
            date: '-',
            price: '-',
            percentDiff: '-',
            btcPurchased: '-',
            runningBal: '-',
            value: '-',
            totalInvested: '-',
            numberOfDips: '-',
            roi: '-',
            averageCost: '-'
        }

        if(this.calculatedBtd().length < 1){
            return initial
        }

        const latest = this.calculatedBtd()[this.calculatedBtd().length - 1]

        return {
            ...initial,
            ...latest,
            averageCost: Math.round(Number(latest.totalInvested) / Number(latest.runningBal))
        }
    },
    chartType: 'runningBal',
    chartData: function(){
        if(this.chartType === 'runningBal'){
            return {
                title: 'Bitcoin Holdings',
                series: [
                    {
                        name: "Bitcoin Holdings",
                        data: this.calculatedBtd().map(item => item['runningBal']).reverse()
                    }
                ]
            }
        }

        return {
            title: 'Portfolio Value Over Time',
            series: [
                {
                    name: "Portfolio Value",
                    data: this.calculatedBtd().map(item => item['value']).reverse()
                },
                {
                    name: "Total Invested",
                    data: this.calculatedBtd().map(item => item["totalInvested"]).reverse()
                }
            ]
        }
    }

}

export const btdReducer = (state, action) => {
    switch(action.type){
        case UPDATE_BTD_PRICE_HISTORY:
            return {
                ...state,
                priceHistory: action.payload
            }
        case UPDATE_BTD_INPUTS:
            return {
                ...state,
                dipPercentage: action.payload.dipPercentage,
                purchaseAmount: action.payload.purchaseAmount,
                startDate: action.payload.startDate
            }
        case UPDATE_BTD_CHART_TYPE:
            return {
                ...state,
                chartType: action.payload
            }
        default:
            return state
    }
}