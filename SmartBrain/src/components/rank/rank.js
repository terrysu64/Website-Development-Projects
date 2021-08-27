import React from 'react';

const Rank = ({User}) => {
	return (
    <div>
      <div className='white f3'>
       Hi {User.name}, you have had a total of {User.images.toString()} {"face(s)"} detected 📸
      </div>
    </div>
	);
};

export default Rank;