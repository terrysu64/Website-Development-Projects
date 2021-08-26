import React, { Component } from 'react';
import Clarifai from 'clarifai';
import './App.css';
import SignIn from './components/sign-in/sign-in';
import Register from './components/register/register';
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
      'imageUrl': '',
      'box': {},
      'page': 'signin',
      'signedIn': false,
      'user': {
        'id': '',
        'name': '',
        'email': '',
        'password': '',
        'images': '',
        'joined': ''
      
      }
    }
  };

  componentDidMount() {
    fetch('http://localhost:3000/')
    .then(console.log('server connected!'))
  };

  LoadUser = (data) => {
    this.setState({'input': '','imageUrl': ''})
    this.setState({'user': {
      'id': data.id,
      'name': data.name,
      'email': data.email,
      'password': data.password,
      'images': data.images,
      'joined': data.joined
    }
    });
  };

  RouteChange = (route) => { //all "signedIn" state changes will occur at routeChange 
    route === 'home' ? this.setState({'signedIn': true}) : this.setState({'signedIn': false})
    this.setState({'page': route})
  };

  LocateFace = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('input-image');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      'top_row': face.top_row * height,
      'bottom_row': (1-face.bottom_row) * height,
      'left_col': face.left_col * width,
      'right_col': (1-face.right_col) * width
    };
  };

  FrameFace = (box) => {
    this.setState({'box': box});
  };

  onSubmit = (event) => {
    this.setState({'imageUrl': this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,this.state.input) //use .input proprety instead of .imageUrl or else an error will arise 
        .then(response => {
          if (response) {
            fetch('http://localhost:3000/image', {
              'method': 'post',
              'headers': {'Content-Type': 'application/json'},
              'body': JSON.stringify({
                'id': this.state.user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, { 'images': count}))
              })
          }
          this.FrameFace(this.LocateFace(response))
        })
        .catch(err => console.log(err))
  };

  onInputChange = (event) => {
    this.setState({'input': event.target.value});
  };

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
        <Navigation SignedIn = {this.state.signedIn} RouteChange={this.RouteChange}/>
        {this.state.page === 'home' 
          ? <div>
              <Logo/>
              <Rank User={this.state.user}/>
              <ImageLink onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
              <ImageBox imgUrl={this.state.imageUrl} box={this.state.box}/>
            </div>
          : ( this.state.page === 'signin'
                ? <SignIn LoadUser={this.LoadUser} RouteChange={this.RouteChange}/>
                : <Register LoadUser={this.LoadUser} RouteChange={this.RouteChange}/>
            )
        }
      </div>
    )
  };
};

export default App;
