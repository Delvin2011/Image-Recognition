import React from 'react';
import './ImageLinkForm.css';
import Select from 'react-select';
//import {Models} from './models';
const Models = [
  { label: "Celebrity", value: "e466caa0619f444ab97497640cefc4dc" },
  { label: "Demographics", value: "c0c0ac362b03416da06ab3fa36fb58e3" },
  { label: "Fashion", value: "e0be3b9d6a454f0493ac3a30784001ff" },
  { label: "Color", value: "eeed0b6733a644cea07cf4c60f87ebb7" },
  { label: "Face Detection", value: "a403429f2ddf4b49b307e318f00e528b" },
  { label: "General", value: "aaa03c23b3724a16a56b629203edc62c" },
  { label: "Food", value: "bd367be194cf45149e75f01d59f77ba7" },
  { label: "Moderation", value: "d16f390eb32cad478c7ae150069bd2c6" },
  { label: "Travel", value: "eee28c313d69466f836ab83287a54ed9" },
  { label: "NSFW", value: "e9576d86d2004ed1a38ba0cf39ecb4b1" },
];

//De-structure from the props
const ImageLinkForm = ({onInputChange,onButtonSubmit,ModelOption,ModelField}) => {
    console.log(ModelOption);
    console.log(ModelField);

    return (
        <div > 

        <div className='center'>
            <div className='form center pa4 br3 shadow-5'>
                <code><Select className='f4 pa2 w-75 center'// ba b--green bg-lightest-blue' 
                    value = {ModelField} 
                    onChange = {ModelOption} 
                    options={Models} />
                </code> 
                <input className = 'gray f4 pa2 w-70 center' placeholder = "U R L . . ." type = 'tex' onChange = {onInputChange}/>
                <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple ma2 br3' onClick = {onButtonSubmit}>Detect</button>
            </div>
        </div>
        </div>
    );
}

export default ImageLinkForm;
