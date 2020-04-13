export const addItemToCart = (cartItems, itemToAdd) => {

    const existingItem = cartItems.find(item => item.id === itemToAdd.id)

    if (existingItem) {
        return cartItems.map(item => (
            item.id === itemToAdd.id ?
            {...item, quantity:item.quantity+1}
            :
            item
        ))
    }

    return [...cartItems, {...itemToAdd, quantity:1}]

}

export const decreaseItemQuantity = (cartItems, itemToDecrease)=>{
    const existingItem = cartItems.find(item => item.id === itemToDecrease.id)

    if (existingItem.quantity === 1){
        return cartItems.filter(item => item.id !== existingItem.id)
    }

    return cartItems.map(item => item.id === itemToDecrease.id ? {...item, quantity:item.quantity-1} : item )

}