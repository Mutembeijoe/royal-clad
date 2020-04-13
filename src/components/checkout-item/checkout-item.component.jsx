import React from 'react'
import './checkout-item.styles.scss'
import { removeItem } from '../../redux/cart/cart.actions';
import { connect } from 'react-redux';


const CheckoutItem = ({item, removeItem}) => {
    const {name,quantity, price, imageUrl} = item
    return (
    <div className="checkout-item">
        <div className="image-container">
        <img src={imageUrl} alt="item"/>
        </div>
        <span className="name">{name}</span>
        <span className="quantity">{quantity}</span>
        <span className="price">{price}</span>
        <div className="remove-button" onClick={()=> removeItem(item)}>&#10005;</div>
    </div>
)}

const mapDispatchToProps = dispatch => ({
    removeItem: (item) => dispatch(removeItem(item))
})
export default connect(null, mapDispatchToProps)(CheckoutItem);