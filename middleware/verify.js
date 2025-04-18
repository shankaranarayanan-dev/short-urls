import User from "../models/User.js"
import jwt from "jsonwebtoken"

import { SECRET_ACCESS_TOKEN } from "../config/index.js"

export async function Verify(req, res, next){
	try{
		console.log(SECRET_ACCESS_TOKEN)
		const authHeader = req.headers["cookie"]
		
		if(!authHeader) return res.sendStatus(401)
			
		const cookie = authHeader.split("=")[1]
		jwt.verify(cookie, SECRET_ACCESS_TOKEN, async( err, decoded ) => {
			
			if(err){
				console.error(err)
				return res.status(401).json({
					message: "This session has expired. Please login"
				})
			}		
			const { id } = decoded;
			const user = await User.findById(id)
			console.log(user)
			const { password, ...data} = user._doc
			req.user = data
			next()
		})
	} catch (err){
		console.error(err)
		res.status(500).json({
			status: "error verify",
			code: 500,
			data: [],
			message: "Internal Server Error",
		})
	}
}
