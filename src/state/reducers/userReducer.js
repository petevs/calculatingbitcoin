export const UPDATE_SETTINGS = "UPDATE_SETTINGS";
export const UPDATE_BROWSER_WIDTH = "UPDATE_BROWSER_WIDTH"
export const UPDATE_DRAWER_OPEN = "UPDATE_DRAWER_OPEN"

export const initialState = {
  firstName: "User",
  lastName: "",
  colorMode: "dark",
  currency: "cad",
  modalOpen: false,
  browserWidth: 0,
  drawerOpen: true,
  drawerVariant: function(){
    if(this.browserWidth > 1024){
      return 'permanent'
    }
    return 'temporary'
  }
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_SETTINGS:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case UPDATE_BROWSER_WIDTH:
        return {
          ...state,
          browserWidth: action.payload
        }
    case UPDATE_DRAWER_OPEN:
      return {
        ...state,
        drawerOpen: action.payload,
      }
    default:
      return state;
  }
};
