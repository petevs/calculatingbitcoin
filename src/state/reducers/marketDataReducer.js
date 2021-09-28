export const GET_DATA = "GET_DATA";
export const UPDATE_DAILY_PRICES = "UPDATE_DAILY_PRICES"
export const UPDATE_TIME_FRAME = "UPDATE_TIME_FRAME"
export const UPDATE_ACTIVE_BUTTON = "UPDATE_ACTIVE_BUTTON"
export const UPDATE_MD_CURRENCY = "UPDATE_MD_CURRENCY"

export const initialMarketData = {
  loaded: false,
  timeFrame: 7,
  currency: 'cad',
  data: {},
  dailyPrices: [],
  activeButton: '1W',
  filteredPrices: function(){

    const startIndex = this.dailyPrices.length - this.timeFrame - 2
    const dates = this.dailyPrices.slice(startIndex).map(item => item[0])
    const prices = this.dailyPrices.slice(startIndex).map(item => Math.round(item[1]))

    return {
      dates: dates,
      prices: prices
    }

  },
  summaryData: function(){

    return {
      currentPrice: this.data.current_price[this.currency],
      ath: this.data.ath[this.currency],
      ath_date: this.data.ath_date[this.currency],
      ath_change_percentage: this.data.ath_change_percentage[this.currency],
      high_24h: this.data.high_24h[this.currency],
      low_24h: this.data.low_24h[this.currency],
      market_cap: this.data.market_cap[this.currency]
    }
  },
  currentPrice: function(){
    return this.data.current_price[this.currency]
  },
  lastEntry: function(){
    const toCompare = this.filteredPrices().prices[0]

    // Find out change in percentage
    let percentageChange = (this.currentPrice() - toCompare) / toCompare * 100
    percentageChange = percentageChange.toFixed(2)

    return {
      percentageChange: percentageChange
    }
  }
}

export const marketDataReducer = (state, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        data: action.payload,
        loaded: true,
      };
    case UPDATE_DAILY_PRICES:
      return {
        ...state,
        dailyPrices: action.payload,
      };
    case UPDATE_TIME_FRAME:
      return {
        ...state,
        timeFrame: action.payload,
      };
    case UPDATE_ACTIVE_BUTTON:
      return {
        ...state,
        activeButton: action.payload,
      };
    case UPDATE_MD_CURRENCY:
      return {
        ...state,
        currency: action.payload,
      };
    default:
      return state;
  }
};
