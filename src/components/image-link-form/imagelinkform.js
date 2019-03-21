import React from 'react';
import './imagelinkform.css';


const ImageLinkForm = () =>{
    return(
        <div >
            <p className="f3">
            {/* Curly brackets allow you to use javascript in this case strings */}
                {'Click the gear Icon to detect the face in you pictures.'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-3'>
                    <input className='f4 pa2 w-70 center' type='tex'/>
                    <button className='f5 w-30 grow f4 link ph3 pv2 dib white bg-light-purple center'>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;