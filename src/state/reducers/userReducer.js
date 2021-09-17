export const UPDATE_CURRENCY= 'UPDATE_CURRENCY'

export const initialState = {
    name: 'Jane',
    colorMode: 'dark',
    currency: 'cad'
}

export const userReducer = (state, action) => {
    switch(action.type){
        case UPDATE_CURRENCY:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        default:
            return state
    }
}