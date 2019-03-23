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
  this.state={
    input: '',
    imageUrl: ''
  }
}

// to pick up what is entered into the input box.
onInputChange = (event) => {
  this.setState({ input: event.target.value});
}

// get button to respond to console in browser then addded API 
// with its own functions.
onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input})

  // API key code not needed to change , sampe pic in there as well.
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      // something wrong here.
      this.state.input)
      .then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
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
       
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
