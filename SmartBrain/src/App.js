import React, { Component } from 'react';
import Clarifai from 'clarifai';
import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLink from './components/image-link/image-link';
import Rank from './components/rank/rank';
import ImageBox from './components/image-box/image-box';
import Particles from 'react-particles-js';

const app = new Clarifai.App({
 apiKey: '7533cc567e74427685796eccba86ca2d'
});

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

class App extends Component {

  constructor() {
    super();
    this.state = {
      'input': '',
      'imageUrl': ''
    }
  };

  onInputChange = (event) => {
    this.setState({'input': event.target.value});
  };

  onSubmit = (event) => {
    this.setState({'imageUrl': this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,this.state.input) //use .input proprety instead of .imageUrl or else an error will arise 
        .then(
          function (response) {
            console.log(response)
          }, 
          function (err) {
            console.log(err)
          }
        );
  };

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLink onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
        <ImageBox imgUrl={this.state.imageUrl}/>
      </div>
    )
  };
};

export default App;
