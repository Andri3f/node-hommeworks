import { body } from "express-validator"

class productValidator {
	static productValidation = [
		body("title").isLength({ min: 3, max: 8 }).withMessage("Title must be between 3 and 8 characters long").trim(),

		body("price").isInt({ min: 10, max: 9999999999 }).withMessage("Price must be an integer between 10 and 9999999999").toInt(),

		body("amount").isInt({ min: 1, max: 100 }).withMessage("Amount must be an integer between 1 and 100").toInt(),
	]
}

export default productValidator
