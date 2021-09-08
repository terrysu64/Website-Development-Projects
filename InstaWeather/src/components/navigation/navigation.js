import React from 'react';
import Logo from './logo.png';
import Tilt from 'react-tilt';
import './navigation.css';

const Navigation = () => {
	return (
		<nav className='navigation sticky shadow-5'>
			<div className='logo-grid'>
				<Tilt className="Tilt" options={{ max : 50 }}>
					<img className='Tilt-inner logo' alt='logo.png' src={Logo}/>
				</Tilt>
			</div>
			<div className='title'>
				<p>InstaWeather</p> 
			</div>
		</nav>
	); 
};

export default Navigation; 