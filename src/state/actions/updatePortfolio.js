import { UPDATE_CHART_TYPE, UPDATE_EDITING_TRANSACTION, UPDATE_PORTFOLIO, UPDATE_PORTFOLIO_TRANSACTIONS, UPDATE_PRICE_HISTORY } from 'state/reducers/portfolioReducer'

export const updatePortfolio = (data) => {
    return { type: UPDATE_PORTFOLIO, payload: data}
}
export const updatePortfolioTransactions = (data) => {
    return { type: UPDATE_PORTFOLIO_TRANSACTIONS, payload: data}
}

export const updateEditingTransaction = (data) => {
    return { type: UPDATE_EDITING_TRANSACTION, payload: data}
}

export const updatePriceHistory = (data) => {
    return { type: UPDATE_PRICE_HISTORY, payload: data}
}

export const updateChartType = (data) => {
    return { type: UPDATE_CHART_TYPE, payload: data}
}