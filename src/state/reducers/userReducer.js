export const UPDATE_SETTINGS = "UPDATE_SETTINGS";

export const initialState = {
  firstName: "Jane",
  lastName: "VS",
  colorMode: "dark",
  currency: "cad",
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_SETTINGS:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
};
