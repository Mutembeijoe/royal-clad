import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect} from 'react-redux';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import Authentication from './pages/authentication/authentication.component';
import {setCurrentUser} from './redux/user/user.actions'
import { auth, createUserProfileDocument} from './firebase/firebase.utils';
import { selectCurrentUser } from './redux/user/user.selectors';

import './App.css';
import CheckoutPage from './pages/checkout/checkout.component';
import { createStructuredSelector } from 'reselect';




class App extends React.Component {
  
  unsuscribeFromAuth = null

  componentDidMount(){
    const {setCurrentUser} = this.props;
    this.unsuscribeFromAuth = auth.onAuthStateChanged(async userAuth=> {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id:snapShot.id,
              ...snapShot.data()
            })
        })
      }else{
        setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount(){
    this.unsuscribeFromAuth()
  }

  render(){
    return (
      <div>
      <Header/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage}/>
          <Route exact path="/signin" render={ () =>  this.props.currentUser ? (<Redirect to='/' />) : (<Authentication/>)} />
        </Switch>
      </div>
    )
  }
  
}
const mapDispatchToProps = dispatch =>({
  setCurrentUser : user  =>  dispatch(setCurrentUser(user))
})

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser,
})
export default connect(mapStateToProps,mapDispatchToProps)(App);
