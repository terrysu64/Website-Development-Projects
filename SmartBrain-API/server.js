//Date: August 25, 2021
//Author: Terry Su
//Purpose: Back-end express.js server for SmartBrain appplication

//currently under testing stages with PostMan, databases and server requests are temporary

import express from 'express';
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json())

const temp_data = {
	'users': [
		{
			'id': '12345',
			'email': 'terry@gmail.com',
			'password': '1111',
			'images': 0
		}
	]
};

//ROUTE ENDPOINTS

app.get('/', (req,res) => {
	res.json(temp_data.users)
});

app.post('/signin', (req,res) => {
	if (req.body.email === temp_data.users[0].email && 
		req.body.password === temp_data.users[0].password) {
		res.json('sucess!')
	}
	else {
		res.status(400).json('cant log in')
	};
});

app.post('/register', (req,res) => {
	const {id, email, password} = req.body
	temp_data.users.push(
		{
			'id': id,
			'email': email,
			'password': password,
			'images': 0
		
		}
	)
	res.json(temp_data.users[temp_data.users.length-1])
});

app.get('/profile/:id', (req,res) => {
	const { id } = req.params
	let found = false
	temp_data.users.forEach(user => {
		if (user.id === id) {
			found = true
			res.send(user)
			return
		}
	})
	if (!found) {
		res.status(400).json('user not found')
	}
});

app.post('/image', (req,res) => {
	const { id } = req.body
	let found = false
	temp_data.users.forEach(user => {
		if (user.id === id) {
			found = true
			user.images++
			res.send(user)
			return
		}
	})
	if (!found) {
		res.status(400).json('user not found')
	}
})

app.listen(3000, () => {
	console.log('app is running on port 3000')
});

