import User from "../models/User.js"
import bcrypt from "bcrypt"

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