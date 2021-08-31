import React from 'react';
import ImageBox from './image-box';
const ImageBoxes = ({imgUrl, boxes}) => {
  if (boxes.top_row===undefined) {
    return <div></div>
  }
  else {
    return (
      <div className='center ma'>
        <div className='absolute mt2'>
         <img id='input-image' alt='' src={imgUrl} width='500px' heigh='auto'/>
         {boxes.top_row.map((info,i) => {
          return <ImageBox key={i} box={{'top_row': boxes.top_row[i],'bottom_row': boxes.bottom_row[i],'left_col': boxes.left_col[i],'right_col': boxes.right_col[i]}}/>
         })}
        </div>
      </div>
    );
  };
};

export default ImageBoxes;