import React from 'react';
import './image-box.css';

const ImageBox = ({ box }) => {
    return (
        <div className='bounding-box' style={{'top': box.top_row, 'bottom': box.bottom_row, 'left': box.left_col, 'right': box.right_col}}></div>
    );
};

export default ImageBox;