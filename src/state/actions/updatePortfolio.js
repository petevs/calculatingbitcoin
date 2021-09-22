import { UPDATE_EDITING_TRANSACTION, UPDATE_PORTFOLIO, UPDATE_PORTFOLIO_TRANSACTIONS } from 'state/reducers/portfolioReducer'

export const updatePortfolio = (data) => {
    return { type: UPDATE_PORTFOLIO, payload: data}
}
export const updatePortfolioTransactions = (data) => {
    return { type: UPDATE_PORTFOLIO_TRANSACTIONS, payload: data}
}

export const updateEditingTransaction = (data) => {
    return { type: UPDATE_EDITING_TRANSACTION, payload: data}
}