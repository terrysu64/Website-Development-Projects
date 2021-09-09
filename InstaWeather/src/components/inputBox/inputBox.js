import React from 'react';
import './inputBox.css';
import 'tachyons';

const InputBox = () => {
	return (
		<div className='input-box center pa4 br3 shadow-5'>
		  <p className='input-header f4 pa2'>Find The Current Weather Of Any City Instantly!</p>
		  <div className='input-elements'>
	          <input className='f4 pa2 w-70 center' type='text' placeholder='Enter City Name'/>
	          <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-blue'>Check Weather</button>
	      </div>
		</div>
	)
}

export default InputBox;