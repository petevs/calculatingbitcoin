export const GET_DATA = 'GET_DATA'

export const initialState = {}

export const marketDataReducer = (state,action) => {
    switch(action.type){
        case GET_DATA:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state
    }
}