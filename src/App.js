import React, { Component } from 'react';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/image-link-form/imagelinkform';
import Rank from './components/rank/rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/face-recog/face';
import Clarifai from 'clarifai';
import Signin from './components/signin/signin';
import Register from './components/register/register';
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
    imageUrl: '',
    box: {},
    route: 'signin'
  }
}

calculateFaceLocation = (data) =>{
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    // teh calculaions for the box around the face.
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
  }
}

displayFaceBox = (box) =>{
  console.log(box);
  this.setState({box: box});
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
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
}

onRouteChange = (route) => {
  this.setState({route: route});
}

  render() {
    return (
      <div className="App">
      
        <Particles className='particles'
                  params={particlesOptions} 
                  />
          <Navigation onRouteChange={this.onRouteChange} />
          { this.state.route === 'home'
              ?  <div>
              <Logo />
              <Rank />
              <ImageLinkForm 
            
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
              />
            
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
              </div>
          : (
            this.state.route === 'signin' ?
            <Signin onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />

            )
         
          }
      </div>
    );
  }
}

export default App;
