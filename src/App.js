import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import Authentication from './pages/authentication/authentication.component';

import './App.css';
import { auth } from './firebase/firebase.utils';


class App extends React.Component {

  state = {
    currentUser:null
  }

  unsuscribeFromAuth = null

  componentDidMount(){
    this.unsuscribeFromAuth = auth.onAuthStateChanged(user => this.setState({currentUser:user}))
  }

  componentWillUnmount(){
    this.unsuscribeFromAuth()
  }

  render(){
    return (
      <div>
      <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={Authentication} />
        </Switch>
      </div>
    )
  }
  
}

export default App;
