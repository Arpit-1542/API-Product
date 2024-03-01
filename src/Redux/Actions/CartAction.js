import { ADD_CART, DELETE_CART } from '../Action'

export let addtocart = () => {
    return {
        type: ADD_CART,
    }
}

export let deletecart = () => {
    return {
        type: DELETE_CART,
    }
}