import { SET_USER } from "../reducers/authReducer";

export const setUser = (data) => {
  return { type: SET_USER, payload: data };
};
