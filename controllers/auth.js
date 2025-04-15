import pg from "pg"

const { Pool } = pg

import { USER, HOST, DATABASE, PASSWORD, PORT } from "../config/index.js"

const pool = new Pool({
    user: USER,
    host: HOST,
    database: DATABASE,
    password: PASSWORD,
    port: PORT,
});



export async function Register (req, res) {
	const {firstname, lastname, email, password } = req.body
	
	console.log(firstname, lastname, email, password )
	//console.log(pool) 
	console.log(USER, HOST, DATABASE, PASSWORD, PORT )

	
	
	try
	{		
		const existingUser = await pool.query('select * from users where email = $1',[email], (error, results) => {
		setTimeout(()=>{console.log('checking')}, 2000)
		
		if(existingUser) {
			console.log('return')
		return res.status(400).json({
		status: "failed",
		data: [],
		message: "It seems you already have an account"
		})
		}
	})
	
	
		const saveUser = await pool.query('INSERT INTO users  (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)', [firstname, lastname, email, password] , (error, results) => {
		if (error) {
		  res.status(500).json({
			  status: "error",
			  code: 500,
			  data: [],
			  message: "Internal Server Error",
		  })
		}
		res.status(200).json({
			status: "success",
			data: [],
			message: "Thank you for registering with us. Your account has been successfully created."
		})
	  })
		} catch(err) {
			console.log(err)
			res.status(500).json({
				status: "error",
				code: 501,
				data: [],
				message: "Internal Server Error"
			})
	}
}

