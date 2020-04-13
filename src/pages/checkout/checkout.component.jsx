import React from 'react'
import './checkout.styles.scss'
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import { connect } from 'react-redux';

const CheckoutPage = ({items, total})=>(
    <div className="checkout-page">
        <div className="checkout-header">
            <div className="header-block">
                <span>Product</span>
            </div>
            <div className="header-block">
                <span>Description</span>
                </div>
            <div className="header-block">
                <span>Quantity</span>
            </div>
            <div className="header-block">
                <span>Price</span>
            </div>
            <div className="header-block">
                <span>Remove</span>
            </div>
        </div>
        <div className="total">
            <span> Total : ${total}</span>
        </div>
    </div>
)

const mapStateToProps = createStructuredSelector({
    items : selectCartItems,
    total : selectCartTotal
})
export default connect(mapStateToProps)(CheckoutPage);