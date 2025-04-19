import User from "../models/User.js"
import bcrypt from "bcrypt"
import Blacklist from "../models/User.js"

// == registration logic ==
export async function Register(req, res){
	
	const { firstname, lastname, email, password } = req.body
	
	try{
		const newUser = new User({
			firstname,
			lastname,
			email,
			password,
		})
		// == check if user already exists ==
		const existingUser = await User.findOne({ email })
		if(existingUser)
			return res.status(400).json({
				status: "failed",
				data: [],
				message: "User already exists"
			})
		const savedUser = await newUser.save()
		const { role, ...user_data} = savedUser._doc
		res.status(200).json({
			status: "success",
			data: [user_data],
			message: "Thanks for registering"
		})
	} catch(err){
		res.status(500).json({
			status: "error reg",
			code: 500,
			data: [],
			message: "Internal Server Error"
		})
	}
	res.end()
}

// == login logic ==

export async function Login(req, res){
	
	const {email} = req.body
	
	try{
		const user = await User.findOne({ email }).select("+password")
		if(!user){
			return res.status(401).json({
				status: "failed",
				data: [],
				message: "Invalid email or password. Please try again"
			})
		}
		// == if user exists ==
		// validate the password
		const isPasswordValid = await bcrypt.compare(`${req.body.password}`, user.password)
		if(!isPasswordValid){
			return res.status(401).json({
				status: "failed",
				data: [],
				message: "Invalid email or password. Please try again"
			})
		}
		
		let options = {
			maxAge: 20 * 60 * 1000,
			httpOnly: true,
			secure: true,
			sameSite: "None",
		}
		console.log(user)
		const token = user.generateAccessJWT()
		
		res.cookie("SessionID", token, options)
		// == return user info ==
		//const { password, ...user_data} = user._doc
		res.status(200).json({
			status: "success",
			//data: [user_data],
			message: "Login successful"
		})
	}catch{
		res.status(500).json({
			status: "error auth",
			code: 500,
			data: [],
			message: "Internal Server Error"
		})
	}
	res.end()
}

export async function Logout(req, res){
	try {
		console.log('logout logic')
		const authHeader = req.headers['cookie']
		if(!authHeader) return res.sendStatus(204)
		const cookie = authHeader.split('=')[1]
		const accessToken = cookie.split(';')[0]
		const checkIfBlacklisted = Blacklist.findOne({ token: accessToken })
		
		if(checkIfBlacklisted) return res.sendStatus(204)
		
		const newBlacklist = new Blacklist({
			token: accessToken,
		})
		const returnData = await newBlacklist.save()
		res.setHeader("Clear-Site-Data", '"cookies"')
		res.status(200).json({message: "you are logged out"})
	}catch(err){
		res.status(500).json({
			status: 'Error Blacklist',
			message: "Internal Server Error"
		})
	}
	res.end()
	//next()
}