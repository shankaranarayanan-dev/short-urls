import * as dotenv from 'dotenv'
dotenv.config()

const {USER, HOST, DATABASE, PASSWORD, PORT } = process.env

export {USER, HOST, DATABASE, PASSWORD, PORT }

