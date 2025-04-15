"use strict"

import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import { USER, HOST, DATABASE, PASSWORD, PORT } from "./config/index.js"
import Router from "./routers/index.js"
import Auth from "./routers/auth.js"
import pg from "pg"

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
//const { Pool } = pg

//const pool = new Pool({
//    user: USER,
//    host: HOST,
//    database: DATABASE,
//    password: PASSWORD,
//    port: PORT,
//});





// == configure routes ==
Router(server)
server.use('/v1/auth', Auth);



// == startup server ==
server.listen(SERVER_PORT, () => {
console.log('server running on port 3000')
})
