import React from 'react';
import './image-box.css';

const ImageBox = ({ imgUrl, box }) => {
	return (
    <div className='center ma'>
      <div className='absolute mt2'>
    	 <img id='input-image' alt='' src={imgUrl} width='500px' heigh='auto'/>
       <div className='bounding-box' style={{'top': box.top_row, 'bottom': box.bottom_row, 'left': box.left_col, 'right': box.right_col}}></div>
      </div>
    </div>
	);
};

export default ImageBox;