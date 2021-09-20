export const SET_USER = "SET_USER";

export const initialState = {};

export const authReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        uid: action.payload.uid,
        email: action.payload.email,
      };
    default:
      return state;
  }
};
