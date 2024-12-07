import { body } from "express-validator"

class AuthValidator {
	static registrationValidator = [
		body("email").exists().withMessage("Email is required").isEmail().withMessage("Invalid email format").normalizeEmail().trim().escape(),

		body("password").exists().withMessage("Password is required").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long").trim().escape(),

		body("passwordConfirm")
			.exists()
			.withMessage("Password confirmation is required")
			.custom((value, { req }) => {
				if (value !== req.body.password) {
					throw new Error("Passwords do not match")
				}
				return true
			})
			.trim()
			.escape(),
	]

	static loginValidator = [
		body("email").exists().withMessage("Email is required").isEmail().withMessage("Invalid email format").normalizeEmail().trim().escape(),

		body("password").exists().withMessage("Password is required").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long").trim().escape(),
	]
}

export default AuthValidator
