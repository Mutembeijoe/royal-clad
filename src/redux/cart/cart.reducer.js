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
                items :addItemToCart(state.items, action.payload)
            }
        case cartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                items : state.items.filter(item => item.id !== action.payload.id)
            }
        default:
            return state
    }
}

export default cartReducer;