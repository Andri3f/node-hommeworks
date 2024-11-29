import { body } from "express-validator"
class StudentValidator {
	static studentValidationRules = [
		body("name").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long").isLength({ max: 15 }).withMessage("Name must be at most 15 characters long").trim().escape(),

		body("age").isInt({ min: 17, max: 50 }).withMessage("Age must be between 17 and 50").toInt(),

		body("averageScore").isFloat({ min: 6, max: 12 }).withMessage("AverageScore must be between 6 and 12").toFloat(),
	]
}
export default StudentValidator
