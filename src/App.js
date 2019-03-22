import React, { Component } from 'react';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/image-link-form/imagelinkform';
import Rank from './components/rank/rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/face-recog/face';
import Clarifai from 'clarifai';
import './App.css';

// API
const app = new Clarifai.App({
  apiKey: '5f569590514d49e99b9ac44c33093a3c'
 });


// creted an object to read intoparticles component below
const particlesOptions = {
    particles: {
      number: {
        value:80,
        density: {
          enable: true,
          value_area:550
        }
      }
    }
  }
  


class App extends Component {
constructor() {
  // constructor to use 'this'
  // needed to use 'this'
  // has to be part of this class.
  super();
  this.state ={
    input: '',
  }
}

// to pick up what is entered into the input box.
onInputChange = (event) => {
  console.log(event.target.value);
}

// get button to respond to console in browser then addded API 
// with its own functions.
onButtonSubmit = () => {
  console.log('click')
  // API key code not needed to change , sampe pic in there as well.
    app.models.predict(
      "a403429f2ddf4b49b307e318f00e528b", 
      "https://samples.clarifai.com/face-det.jpg")
      .then(
      function(response) {
        console.log(response);
        // do something with response
      },
      function(err) {
        // there was an error
      }
    );
}

  render() {
    return (
      <div className="App">
      <Particles className='particles'
                params={particlesOptions} 
                />
        <Navigation/>
        <Logo/>
        <Rank/>
        {/* Passed as prop the costructor above*/}
        <ImageLinkForm 
      
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
        />
       
        <FaceRecognition/>
      </div>
    );
  }
}

export default App;
