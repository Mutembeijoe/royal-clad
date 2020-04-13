import React from 'react'
import './checkout-item.styles.scss'
import { removeItem, decreaseItemQuantity, addItem } from '../../redux/cart/cart.actions';
import { connect } from 'react-redux';


const CheckoutItem = ({item, removeItem, decreaseItem, addItem}) => {
    const {name,quantity, price, imageUrl} = item
    return (
    <div className="checkout-item">
        <div className="image-container">
        <img src={imageUrl} alt="item"/>
        </div>
        <span className="name">{name}</span>
        <span className="quantity">
            <div className="arrow" onClick={()=> decreaseItem(item)}>&#10094;</div>
            <span className='value'>{quantity}</span>
            <div className="arrow" onClick={()=> addItem(item)}>&#10095;</div>
        </span>
        <span className="price">{price}</span>
        <div className="remove-button" onClick={()=> removeItem(item)}>&#10005;</div>
    </div>
)}

const mapDispatchToProps = dispatch => ({
    removeItem: (item) => dispatch(removeItem(item)),
    decreaseItem : (item) => dispatch(decreaseItemQuantity(item)),
    addItem : (item) => dispatch(addItem(item))
})
export default connect(null, mapDispatchToProps)(CheckoutItem);