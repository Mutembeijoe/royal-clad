import React from 'react'
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import { connect } from 'react-redux'

import { toggleCartDropDown } from '../../redux/cart/cart.actions'

import './cart-icon.styles.scss'




const CartIcon = (props)=>{
    const {toggleCartDropDown} = props;
    return (
    <div className="cart-icon" onClick={toggleCartDropDown}>
        <ShoppingIcon className="shopping-icon"/>
        <span className="item-count">0</span>
    </div>
)
}

const mapDispatchToProps = (dispatch) => ({
    toggleCartDropDown : ()=> dispatch(toggleCartDropDown())
})
export default connect(null, mapDispatchToProps)(CartIcon);