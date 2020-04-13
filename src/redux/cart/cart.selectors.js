import { createSelector } from "reselect";


const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.items
)


export const selectCartItemsCount = createSelector(
    [selectCartItems],
    (items) => {
       return items.reduce((accumatedValue, item) => 
        accumatedValue + item.quantity , 0)
    }
)
