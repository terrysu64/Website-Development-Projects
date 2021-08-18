import React from 'react';
import './image-link.css';

const ImageLink = ({ onInputChange, onSubmit }) => {
	return (
    <div>
    	<p className='f3'>
        SmartBrain will accurately detect any faces in an image! Give it a shot!
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input className='f4 pa2 w-70 center' type='tex' placeholder='Image URL' onChange={onInputChange}/>
          <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onSubmit}>Detect</button>
        </div>
      </div>
    </div>
	);
};

export default ImageLink;