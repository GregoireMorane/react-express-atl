import React, { Component } from 'react';
import './App.css';
import Areas from './Areas.js';
import Resto from './Resto.js';
import Header from './Header.js';
import Footer from './Footer.js';
import { Switch, Route } from "react-router-dom";
import MapAll from './MapAll';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
          <Switch>
            <Route exact path="/" component={Areas} />
            <Route path="/resto/:id" component={Resto} />
            <Route path="/mapall" component={MapAll} />
          </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
