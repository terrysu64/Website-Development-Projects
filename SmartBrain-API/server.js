//Date: August 25, 2021
//Author: Terry Su
//Purpose: Back-end express.js server for SmartBrain appplication

//currently under testing stages with PostMan, and shifting database to PostgreSQL

import express from 'express';
import bodyParser from "body-parser";
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import validator from "email-validator"
import knex from "knex";

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '335477626',
      database : 'SmartBrain'
    }
  });

const app = express();
app.use(bodyParser.json());
app.use(cors());

const temp_data = {
	'users': []
};

//ROUTE ENDPOINTS

//UPDATED
app.get('/', (req,res) => {
	db('users')
		.returning('*')
		.then(users => {
			res.json(users)
		})
});

//needs update
app.post('/signin', (req,res) => {
	for (let i = 0; i < temp_data.users.length; i++) {
		if (temp_data.users[i].email === req.body.email &&
			temp_data.users[i].password === req.body.password) {
			return res.json(temp_data.users[i])
		}
	};
	res.status(400).json('user does not exist')
});

//UPDATED
app.post('/register', (req,res) => {
	const {name, email, password} = req.body
	db('users')
		.returning('*')
		.insert({
			'email': email,
			'name': name,
			'joined': new Date()
		})
		.then(user => {
			res.json(user[0])
		})
		.catch(err => res.status(400).json('Registration Error'))
});

//UPDATED
app.get('/profile/:id', (req,res) => {
	const { id } = req.params
	db.select('*').from('users').where({id})
		.then(user => {
			if (user.length) {
				res.json(user[0])
			}
			else {
				res.status(400).json('error getting user')
			}
		})
});

//UPDATED
app.post('/image', (req,res) => {
	const { id } = req.body
	db('users').where('id', '=', id)
	.increment('images', 1)
	.returning('images')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('error updating image count'))
})

app.listen(3000, () => {
	console.log('app is running on port 3000')
});

