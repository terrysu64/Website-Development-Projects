// Date: August 3, 2021
// Author: Terry Su
// Purpose: The webpage script for index.html

var color1 = document.querySelector('.color1')
var color2 = document.querySelector('.color2')
var colorDisplay = document.getElementsByTagName('h3')[0]
var body = document.getElementsByTagName('body')[0]

function changeGradient() {
	body.style.background = 'linear-gradient(to right, ' + 
						color1.value + ' , ' + 
						color2.value + ')'

	colorDisplay.textContent = 'Left: ' + color1.value + ', ' + 'Right: ' + color2.value
}

color1.addEventListener('input', changeGradient)

color2.addEventListener('input', changeGradient)