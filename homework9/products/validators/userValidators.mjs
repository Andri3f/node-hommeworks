import { body } from "express-validator"
class userValidator {
	static userValidation = [
		body("userName").isLength({ min: 3, max: 8 }).withMessage("Name must be between 3 and 8 characters long").trim(),

		body("password")
			.isLength({ min: 8, max: 16 })
			.withMessage("Password must be between 8 and 16 characters long")
			.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
			.withMessage("Password must contain at least one uppercase letter, one lowercase letter, and one number"),
	]
}
export default userValidator
