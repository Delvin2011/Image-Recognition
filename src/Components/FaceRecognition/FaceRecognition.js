import React from 'react';

const FaceRecognition = ({imageUrl}) => {
    return (
    <div className = 'centre ma'>
        <div>
            <img alt='' src = {imageUrl} width = '500px' height = 'auto'/>
        </div>
        
    </div>
    );
}

export default FaceRecognition;