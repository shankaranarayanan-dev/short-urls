import express from "express"
import { Register} from "../controllers/auth.js"
import Validate from "../middleware/validate.js"
import { check } from "express-validator"

const router = express.Router()

router.post("/register", Register)

export default router