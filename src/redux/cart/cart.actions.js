import cartActionTypes from "./cart.types";

export const toggleCartDropDown = ()=>({
    type:cartActionTypes.TOGGLE_CART_DROPDOWN
})

export const addItem = (item)=>({
    type:cartActionTypes.ADD_ITEM,
    payload:item
})

export const removeItem = (item) => ({
    type:cartActionTypes.REMOVE_ITEM,
    payload: item
})