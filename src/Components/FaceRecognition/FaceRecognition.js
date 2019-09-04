import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box, ModelField}) => {
    
    return (
        <div className = 'centre ma'>
            <div className='absolute mt2'>
                <img id = 'inputimage' alt='' src = {imageUrl} width = '500px' height = 'auto'/>
              {  typeof(ModelField) === 'undefined' || ModelField === null
               ?   <div></div>
               : (ModelField.label === "Celebrity" || ModelField.label   === "Demographics" || ModelField.label   === "Face Detection") && typeof(box) != 'undefined'
              ?
                   
                <div>
                
                    {  box.length === 4 
                    ?    
                        <div>
                            <div className='bounding-box' id = "con1"
                                style={{"top": box[0].topRow, right: box[0].rightCol, bottom: box[0].bottomRow, left: box[0].leftCol}}>
                            </div>
                            <div className='bounding-box' id = "con2"
                                style={{top: box[1].topRow, right: box[1].rightCol, bottom: box[1].bottomRow, left: box[1].leftCol}}>
                            </div>
                            <div className='bounding-box' id = "con3"
                                style={{top: box[2].topRow, right: box[2].rightCol, bottom: box[2].bottomRow, left: box[2].leftCol}}>
                            </div>
                            <div className='bounding-box' id = "con4"
                                style={{top: box[3].topRow, right: box[3].rightCol, bottom: box[3].bottomRow, left: box[3].leftCol}}>
                            </div>
                        </div>          
                        
                    :    box.length === 3
                    ?    
                        <div>
                            <div className='bounding-box' id = "con1"
                                style={{"top": box[0].topRow, right: box[0].rightCol, bottom: box[0].bottomRow, left: box[0].leftCol}}>
                            </div>
                            <div className='bounding-box' id = "con2"
                                style={{top: box[1].topRow, right: box[1].rightCol, bottom: box[1].bottomRow, left: box[1].leftCol}}>
                            </div>
                            <div className='bounding-box' id = "con3"
                                style={{top: box[2].topRow, right: box[2].rightCol, bottom: box[2].bottomRow, left: box[2].leftCol}}>
                            </div>
                        </div>
                        
                    :   box.length === 2 
                    ?   
                    <div>          
                            <div className='bounding-box' id = "con1"
                                style={{"top": box[0].topRow, right: box[0].rightCol, bottom: box[0].bottomRow, left: box[0].leftCol}}>
                            </div>
                            <div className='bounding-box' id = "con2"
                                style={{top: box[1].topRow, right: box[1].rightCol, bottom: box[1].bottomRow, left: box[1].leftCol}}>
                            </div>
                        </div>
                        
                    : box.length === 1
                        ? 
                            <div className='bounding-box'id = "con1"
                                style={{"top": box[0].topRow, right: box[0].rightCol, bottom: box[0].bottomRow, left: box[0].leftCol}}>
                            </div>
                        : <div></div>    
                        
                    }   
                    </div> 
                    :  <div></div>                           
              }   
            </div>       
        </div>
        );
    
}

export default FaceRecognition;