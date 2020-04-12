import cartActionTypes from "./cart.types";
import { addItemToCart } from "./cart.utils";

const INITIAL_STATE = {
    hidden:true,
    items : []
}
const cartReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case cartActionTypes.TOGGLE_CART_DROPDOWN:
            return {
                ...state,
                hidden:!state.hidden
            }
        case cartActionTypes.ADD_ITEM:
            return {
                ...state,
                // items:[...state.items, action.payload]
                items :addItemToCart(state.items, action.payload)
            }
        default:
            return state
    }
}

export default cartReducer;