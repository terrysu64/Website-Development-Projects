import React, { Component } from 'react';
import Navigation from './components/navigation/navigation';
import InputBox from './components/inputBox/inputBox';
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
        <Navigation/> {/*sticky element*/}
        <InputBox/>
      </div>
    )
  };

};

export default App;
