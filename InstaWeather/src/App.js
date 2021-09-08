import React, { Component } from 'react';
import Navigation from './components/navigation/navigation';
import './App.css';

class App extends Component {

  constructor() {
    super();
  };

  componentDidMount() {
    console.log('app is running!')
  };

  render() {
    return (
      <div className='app'>
        <Navigation/>
      </div>
    )
  };

};

export default App;
