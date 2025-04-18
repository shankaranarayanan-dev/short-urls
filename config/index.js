import * as dotenv from 'dotenv'

dotenv.config()

const { URL, SECRET_ACCESS_TOKEN  } = process.env

export { URL, SECRET_ACCESS_TOKEN }

