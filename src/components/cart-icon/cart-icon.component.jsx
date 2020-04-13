import React from 'react'
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import { connect } from 'react-redux'

import { toggleCartDropDown } from '../../redux/cart/cart.actions'
import { selectCartItemsCount } from '../../redux/cart/cart.selectors'

import './cart-icon.styles.scss'



const CartIcon = ({toggleCartDropDown, itemsCount}) => (
    <div className="cart-icon" onClick={toggleCartDropDown}>
        <ShoppingIcon className="shopping-icon"/>
        <span className="item-count">{itemsCount}</span>
    </div>
)


const mapStateToProps = (state) => ({
    itemsCount: selectCartItemsCount(state)
})

const mapDispatchToProps = (dispatch) => ({
    toggleCartDropDown : ()=> dispatch(toggleCartDropDown())
})
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);