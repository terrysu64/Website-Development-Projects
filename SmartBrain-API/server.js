//Date: August 25, 2021
//Author: Terry Su
//Purpose: Back-end express.js server for SmartBrain appplication

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

app.get('/', (req,res) => {
	db('users')
		.returning('*')
		.then(users => {
			res.json(users)
		})
});

app.post('/signin', (req,res) => {
	db.select('email', 'hash').from('login')
		.where('email', '=', req.body.email)
		.then(data => {
			const valid = bcrypt.compareSync(req.body.password, data[0].hash);
			if (valid) {
				return db.select('*').from('users')
					.where('email', '=', req.body.email)
					.then(user => {
						res.json(user[0])
					})
					.catch(err => res.status(400).json('unable to retreive user'))
			}
			else {
				res.status(400).json('credentials not found')
			}
		})
		.catch(err => res.status(400).json('crendentials not found'))
});

app.post('/register', (req,res) => {
	const {name, email, password} = req.body
	const hash = bcrypt.hashSync(password)
	db.transaction(trx => {
		trx.insert({
			'hash': hash,
			'email': email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
			.returning('*')
			.insert({
				'email': email,
				'name': name,
				'joined': new Date()
			})
			.then(user => {
				res.json(user[0])
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('Registration Error'))
});

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

app.post('/image', (req,res) => {
	const { id, faces } = req.body
	db('users').where('id', '=', id)
	.increment('images', faces)
	.returning('images')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('error updating image count'))
})

app.listen(3000, () => {
	console.log('app is running on port 3000')
});

