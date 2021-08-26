//Date: August 25, 2021
//Author: Terry Su
//Purpose: Back-end express.js server for SmartBrain appplication

//currently under testing stages with PostMan, databases and server requests are temporary

import express from 'express';
import bodyParser from "body-parser";
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const temp_data = {
	'users': [
		{
			'id': '12345',
			'name': 'Terry',
			'email': 'terry@gmail.com',
			'password': '1111',
			'images': 0,
			'joined': new Date()

		}
	]
};

//ROUTE ENDPOINTS

app.get('/', (req,res) => {
	res.json(temp_data.users)
});

app.post('/signin', (req,res) => {
	for (let i = 0; i < temp_data.users.length; i++) {
		if (temp_data.users[i].email === req.body.email &&
			temp_data.users[i].password === req.body.password) {
			return res.json(temp_data.users[i])
		}
	};
	res.status(400).json('user does not exist')
});

app.post('/register', (req,res) => {
	const {name, email, password} = req.body
	temp_data.users.push(
		{
			'id': '123',
			'name': name,
			'email': email,
			'password': password,
			'images': 0,
			'joined': new Date()
		
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
			res.json(user.images)
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

