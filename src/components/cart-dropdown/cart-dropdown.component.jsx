import React from 'react';
import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';
import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { withRouter } from 'react-router-dom';
import { toggleCartDropDown } from '../../redux/cart/cart.actions';


const CartDropdown = ({items, history, dispatch})=>(
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                items.length ? 
                items.map(item => <CartItem key={item.id} item={item} />)
                :
                <span className="empty-message">Your cart is empty</span>
                
            }
        </div>
        <CustomButton onClick={()=> {
            history.push('/checkout')
            dispatch(toggleCartDropDown())
            }}>
            Go To Checkout
            </CustomButton>
    </div>
)

const mapStateToProps = (state)=> ({
    items: selectCartItems(state)
})
export default withRouter(connect(mapStateToProps)(CartDropdown));