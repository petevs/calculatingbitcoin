export const GET_DATA = "GET_DATA";
export const UPDATE_DAILY_PRICES = "UPDATE_DAILY_PRICES"
export const UPDATE_TIME_FRAME = "UPDATE_TIME_FRAME"

export const initialMarketData = {
  loaded: false,
  timeFrame: 7,
  data: {},
  dailyPrices: [],
  filteredPrices: function(){

    const startIndex = this.dailyPrices.length - this.timeFrame - 2
    const dates = this.dailyPrices.slice(startIndex).map(item => item[0])
    const prices = this.dailyPrices.slice(startIndex).map(item => Math.round(item[1]))

    return {
      dates: dates,
      prices: prices
    }

  }
};

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
    default:
      return state;
  }
};
