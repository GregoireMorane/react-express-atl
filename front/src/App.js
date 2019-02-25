import React, { Component } from 'react';
import './App.css';
import Areas from './Areas.js';
import Header from './Header.js';
import Footer from './Footer.js';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <Areas />
        <Footer />
      </div>
    );
  }
}

export default App;
