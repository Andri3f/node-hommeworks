import { body } from "express-validator"

class UserValidator {
	static carValidationRules = [
		body("year").isInt({ min: 1900, max: new Date().getFullYear() }).withMessage("Рік має бути числом від 1900 до поточного року").trim().escape(),
		body("price").isLength({ min: 3, max: 8 }).withMessage("Ціна має бути від 3 до 8 цифр").trim().escape(),
	]
	static carValidationSchema = {
		title: {
			isLength: {
				options: { min: 5, max: 8 },
				errorMessage: "Title must be at least 8 characters long",
			},
			trim: true,
			escape: true,
		},
		year: {
			isInt: {
				options: { min: 1900, max: new Date().getFullYear() },
				errorMessage: "Рік має бути числом від 1900 до поточного року",
			},
		},
		price: {
			isInt: {
				options: { min: 100, max: 99999999 },
				errorMessage: "Ціна має бути числом від 3 до 8 цифр",
			},
		},
	}
}

export default UserValidator
