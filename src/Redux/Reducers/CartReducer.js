import { ADD_CART, DELETE_CART } from '../Action'

let initialValue = {
    count: JSON.parse(localStorage.getItem('cart')) != null ? JSON.parse(localStorage.getItem('cart')).length : 0
};

export const CartReducer = (state = initialValue, action) => {
    switch (action.type) {
        case ADD_CART:
            return {
                ...state, count: state.count + 1
            }
        case DELETE_CART:
            return {
                ...state, count: state.count - 1
            }
        default:
            return state;
    }
}