import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { auth } from '../../firebase/firebase.utils'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { selectToggleDropDownStatus } from '../../redux/cart/cart.selectors'


import {ReactComponent as Logo} from '../../assets/crown.svg'
import './header.styles.scss'
import { createStructuredSelector } from 'reselect'






const Header = ({currentUser, hidden})=>(
    <div className="header">
        <Link to='/' className='logo-container'>
            <Logo></Logo>
        </Link>
        <div className="options">
            <Link to='/shop' className="option">SHOP</Link>
            <Link to='/contact' className="option">CONTACT</Link>
            {
              currentUser ? 
              <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div> 
              :
              <Link to='/signin' className='option'>SIGN IN</Link> 
            }
            <CartIcon/>
        </div>
        {hidden ? null :  <CartDropdown/> }
       
    </div>
)

const mapStateToProps = createStructuredSelector({
    currentUser : selectCurrentUser,
    hidden : selectToggleDropDownStatus
})
export default connect(mapStateToProps)(Header);