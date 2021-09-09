import React from 'react';
import Logo from './logo.png';
import Tilt from 'react-tilt';
import './navigation.css';
import 'tachyons';

const Navigation = () => {
	return (
		<nav className='navigation sticky'>
			<div className='logo-grid'>
				<Tilt className="Tilt" options={{ max : 50 }}>
					<img className='Tilt-inner logo shadow-5' alt='logo.png' src={Logo}/>
				</Tilt>
			</div>
			<div className='title'>
				<p id='title-text'>InstaWeather</p> 
			</div>
		</nav>
	); 
};

export default Navigation; 