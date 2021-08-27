//Date: August 25, 2021
//Author: Terry Su
//Purpose: Back-end express.js server for SmartBrain appplication

//currently under testing stages with PostMan, databases and server requests are temporary

import express from 'express';
import bodyParser from "body-parser";
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import validator from "email-validator"

const app = express();
app.use(bodyParser.json());
app.use(cors());

const temp_data = {
	'users': []
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
	if (name && validator.validate(email) && !(temp_data.users.map((user) => user.email).includes(email.toLowerCase()))) {
		temp_data.users.push(
			{
				'id': '123',
				'name': name,
				'email': email.toLowerCase(),
				'password': password,
				'images': 0,
				'joined': new Date(),
				'used': []
			
			}
		);
		res.json(temp_data.users[temp_data.users.length-1])
	};
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
	const { id, url } = req.body
	temp_data.users.forEach(user => {
		if (user.id === id && !(user.used.includes(url))) {
			user.images++
			user.used.push(url)
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

