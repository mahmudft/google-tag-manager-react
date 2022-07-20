import React, { Component } from 'react';
import Card from './components/Card'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import ProductDetail from './components/ProductDetail';
import Payment from './components/Payment';

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/'>
            <Card />
          </Route>
          <Route exact path='/product/:id' >
            <ProductDetail />
          </Route>
          <Route exact path='/cart'>
            <Payment/>
          </Route>
        </Switch>
      </Router>

    )
  }
}

export default App;
