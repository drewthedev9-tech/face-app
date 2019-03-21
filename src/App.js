import React, { Component } from 'react';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/image-link-form/imagelinkform';
import Rank from './components/rank/rank';
import Particles from 'react-particles-js';
import './App.css';


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
  render() {
    return (
      <div className="App">
      <Particles className='particles'
                params={particlesOptions} 
                />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm/>
       
        {/* <FaceRecognition/> */}
      </div>
    );
  }
}

export default App;
