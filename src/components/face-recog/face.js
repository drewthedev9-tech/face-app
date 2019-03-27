import React from 'react';


const FaceRecognition = ({ imageUrl }) =>{n
    return(
        <div className='center ma'>
            <div className="absoloute mt2">
                <img
                    alt = '' 
                    src ={imageUrl}
                    width='500px' height='auto'
                />
            </div>
            
        </div>
    )
}

export default FaceRecognition;