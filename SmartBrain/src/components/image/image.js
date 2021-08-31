import React from 'react';

const Image = ({ imgUrl}) => {
  	return (
      <div className='center ma'>
        <div className='absolute mt2'>
      	 <img id='input-image' alt='' src={imgUrl} width='500px' heigh='auto'/>
        </div>
      </div>
  	);
};

export default Image;