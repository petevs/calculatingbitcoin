export const GET_DATA = "GET_DATA";

export const initialMarketData = {
  data: {
    current_price: {
      cad: 0,
      usd: 0,
    },
    price_change_percentage_24h_in_currency: {
      cad: 0,
      usd: 0,
    },
  },
};

export const marketDataReducer = (state, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
