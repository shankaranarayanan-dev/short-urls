import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {SECRET_ACCESS_TOKEN } from '../config/index.js'

const UserSchema = mongoose.Schema(
{
	firstname: {
		type: String,
		required: "Your firstname is required",
		max: 25,
	},
	lastname: {
		type: String,
		required: "Your lastname is required",
		max: 25,
	},
	email: {
		type: String,
		required: "Your email is required",
		unique: true,
		lowercase: true,
		trim: true,
	},
		password: {
		type: String,
		required: "Your password is required",
		select: false,
		max: 25,
	},
	role: {
		type: String,
		required: true,
		default: "0x01"
	},
	
},
{ timestamps: true }
);

UserSchema.pre("save", function( next ){
	
	const user = this;
	
	if(!user.isModified("password")) return next()
		
	bcrypt.genSalt(10, (err, salt) => {
		if(err) return next(err)
		
		bcrypt.hash(user.password, salt, (err, hash) =>{
			if(err) return next(err)
		
			user.password = hash
			next()
		})
	})
})

UserSchema.methods.generateAccessJWT = function () {
	console.log(SECRET_ACCESS_TOKEN)
	let payload = {
		id: this._id
	}
	return jwt.sign(payload, SECRET_ACCESS_TOKEN, {
		expiresIn: '20m',
	})
}

export default mongoose.model("users", UserSchema)
