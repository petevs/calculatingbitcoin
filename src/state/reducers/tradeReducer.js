export const UPDATE_TRADE_DATA = "UPDATE_TRADE_DATA"


export const initialTrade = {
    bitcoin: 1,
    averageCost: 35000,
    currentPrice: 50000,
    taxRate: 30,
    capitalGain: true,
    proceeds: function(){
        return this.bitcoin * this.currentPrice
    },
    cost: function(){
        return this.bitcoin * this.averageCost
    },
    profit: function(){
        return this.proceeds() - this.cost()
    },
    taxResults: function (){

        let tax
        let taxableGain
        let gainRate

        if(this.capitalGain){
            tax = Math.round(this.profit() * 0.5 * (this.taxRate / 100));
            taxableGain = this.profit() * 0.5;
            gainRate = 50;
        }

        else {
            tax = Math.round(this.profit() * (this.taxRate / 100));
            taxableGain = this.profit();
            gainRate = 100;
        }

        return {
            tax: tax,
            taxableGain: taxableGain,
            gainRate: gainRate
        }
    },
    results: function(){
        const netProfit = this.profit() - this.taxResults().tax
        const leftOverCash = this.proceeds() - this.taxResults().tax
        const breakEven = leftOverCash / this.bitcoin
        const percentageLess  = Math.round((1 - breakEven / this.currentPrice) * 100)

        return {
            netProfit: netProfit,
            leftOverCash: leftOverCash,
            breakEven: breakEven,
            percentageLess: percentageLess
        }
    },
    simulation: function(){
        const range =  [...Array(201).keys()].slice(50)
        const prices = range.map(item => {
            return Math.round((item / 100) * this.currentPrice)
        })

        const btcAmount = prices.map(price => {
            return (this.results().leftOverCash / price).toFixed(8)
        })

        return {
            xdata: prices.reverse(),
            series: [
                {
                    name: 'bitcoin',
                    data: btcAmount
                }
            ]
        }
    }
}


export const tradeReducer = (state, action) => {
    switch(action.type){
        case UPDATE_TRADE_DATA:
            return {
                ...state,
                bitcoin: Number(action.payload.bitcoin),
                averageCost: Number(action.payload.averageCost),
                currentPrice: Number(action.payload.currentPrice),
                taxRate: Number(action.payload.taxRate),
                capitalGain: action.payload.capitalGain,
            }
        default:
            return state
    }
}