import { body } from "express-validator"
class CourseValidation {
	static courseValidationRules = [
		body("title").isLength({ min: 3 }).withMessage("Tile must be at least 3 characters long").isLength({ max: 15 }).withMessage("Tile must be at most 15 characters long").trim().escape(),

		body("duration").isInt({ min: 50, max: 300 }).withMessage("Duration must be 50 - 300 hours").toInt(),

		body("studentsList")
			.custom((value) => {
				if (Array.isArray(value)) {
					return value.length > 0
				} else if (typeof value === "string") {
					return value.trim().length > 0
				}
			})
			.withMessage("must be at least 1 student"),
	]
}
export default CourseValidation
