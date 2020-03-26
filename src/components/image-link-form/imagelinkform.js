import React from 'react';
import './imagelinkform.css';


const ImageLinkForm = ({onInputChange, onButtonSubmit}) =>{
    return(
        <div >
            <p className="f3">
            {/* Curly brackets allow you to use javascript in this case strings */}
                {'Enter the URlor Image Address of a image cotaiing a face, watch the detection.'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-3'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} />
                    
                    <button 
                    className='f5 w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                    onClick={onButtonSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;