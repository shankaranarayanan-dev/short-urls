import express from "express"
import { Register, Login, Logout } from "../controllers/auth.js"
import Validate from "../middleware/validate.js"
import { check } from "express-validator"

const router = express.Router()

router.post("/register", 
			check("email")
				.isEmail()
				.withMessage("Enter a valid email address")
				.normalizeEmail(),
			check("firstname")
				.not()
				.isEmpty()
				.withMessage("Your first name is required")
				.trim()
				.escape(),
			check("lastname")
				.not()
				.isEmpty()
				.withMessage("Your last name is required")
				.trim()
				.escape(),
			check("password")
				.notEmpty()
				.isLength({ min: 8})
				.withMessage("Must be atleast 8 chars long"),
			Validate,
			Register
)

router.post(
		"/login",
		check("email")
			.isEmail()
			.withMessage("Enter a valid email address")
			.normalizeEmail(),
			check("password").not().isEmpty(),
			Validate,
			Login		
		)
		
// Logout route ==
router.get('/logout', Logout);

export default router