import User from "../models/User.js"

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
			status: "error",
			code: 500,
			data: [],
			message: "Internal Server Error"
		})
	}
	res.end()
}