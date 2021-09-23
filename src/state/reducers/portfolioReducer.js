export const UPDATE_PORTFOLIO = 'UPDATE_PORTFOLIO'
export const UPDATE_PRICE = 'UPDATE_PRICE'
export const UPDATE_PORTFOLIO_TRANSACTIONS = 'UPDATE_PORTFOLIO_TRANSACTIONS'
export const UPDATE_EDITING_TRANSACTION = 'UPDATE_EDITING_TRANSACTION'

export const initialPortfolio = {
    bitcoin: 0,
    amountInvested: 0,
    currentPrice: 56705,
    priceChange24h: 0,
    value: function() {
        return (this.calculatedTotal() * this.currentPrice).toFixed(0)
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
    ],
    calculatedTransactions: function(){
        let runningBal = 0
        let newTrans = []
        this.transactions.slice().reverse().forEach(trans => {
            runningBal = Number(runningBal) + Number(trans.bitcoinAmount)
            newTrans.push({
                ...trans,
                runningBal: runningBal.toFixed(8)
            })
        })
        return newTrans.slice().reverse()
    },
    currentlyEditing: false,
    editing: {
        id: null,
        values: {
            type: '',
            date: '',
            memo: '',
            bitcoinAmount: 0,
            dollarAmount: 0
        }
    },
    calculatedTotal: function(){
        let total = 0
        this.transactions.map(trans => (total += Number(trans.bitcoinAmount) ))
        return total.toFixed(8)
    },
    calculatedTotalInvested: function(){
        let total = 0
        this.transactions.forEach(trans => (total += Number(trans.dollarAmount)))
        return total
    },
    calculatedRoi: function(){
        return (((this.value() - this.calculatedTotalInvested()) / this.calculatedTotalInvested()) * 100).toFixed(2)
    },
    calculatedAvgCost: function(){
        return (this.calculatedTotalInvested() / this.calculatedTotal()).toFixed(0)
    }
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
        case UPDATE_EDITING_TRANSACTION:
            return {
                ...state,
                editing: {
                    ...state.editing,
                    id: action.payload.id,
                    values: {
                        ...state.values,
                        type: action.payload.type,
                        date: action.payload.date,
                        memo: action.payload.memo,
                        bitcoinAmount: action.payload.bitcoinAmount,
                        dollarAmount: action.payload.dollarAmount
                        }
                    }
                }
            default:
                return state
        }
    }