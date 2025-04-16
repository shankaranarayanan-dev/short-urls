"use strict"

import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import { URL } from "./config/index.js"
import Router from "./routers/index.js"


// == create server ==
const server = express()

const SERVER_PORT = 3000

server.set('view engine', 'ejs')

// == configure header information ==
server.use(cors())
server.disable("x-powered-by")
server.use(cookieParser())
server.use(express.urlencoded({ extended: false}))
server.use(express.json())

// == connect to database ==
mongoose.promise = global.promise
mongoose.set("strictQuery", false)
mongoose
	.connect(URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(console.log("Connected to DB"))
	.catch((err) => console.log(err))





// == configure routes ==
Router(server)
//server.use('/v1/auth', Auth);



// == startup server ==
server.listen(SERVER_PORT, () => {
console.log('server running on port 3000')
})
