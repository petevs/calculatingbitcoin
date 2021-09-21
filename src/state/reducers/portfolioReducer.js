export const UPDATE_PORTFOLIO = 'UPDATE_PORTFOLIO'
export const UPDATE_PRICE = 'UPDATE_PRICE'
export const UPDATE_PORTFOLIO_TRANSACTIONS = 'UPDATE_PORTFOLIO_TRANSACTIONS'

export const initialPortfolio = {
    bitcoin: 0,
    amountInvested: 0,
    currentPrice: 0,
    priceChange24h: 0,
    value: function() {
        return (this.bitcoin * this.currentPrice).toFixed(0)
        },
    avgCost: function() {
        if(this.bitcoin !== 0 || this.amountInvested !== 0){
            return (this.amountInvested / this.bitcoin).toFixed(0)
        } else {
            return 0
        }
        },
    profit: function(){
        return this.value() - this.amountInvested
    },
    valueChange24h: function(){
        return (this.priceChange24h * this.bitcoin).toFixed(0)
    },
    transactions: [
        {}
    ]
}


export const portfolioReducer = (state, action) => {
    switch(action.type){
        case UPDATE_PORTFOLIO:
            return {
                ...state,
                bitcoin: action.payload.bitcoin,
                amountInvested: action.payload.amountInvested
            }
        case UPDATE_PORTFOLIO_TRANSACTIONS:
            return {
                ...state,
                transactions: action.payload
            }
        default:
            return state
    }
}