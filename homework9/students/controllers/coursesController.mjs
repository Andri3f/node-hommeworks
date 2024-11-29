import StudentDbServices from "../modules/students/StudentDbServices.mjs"
import CourseDbServices from "../modules/courses/CourseDbServices.mjs"
import SeminarDbServices from "../modules/seminars/SeminarDbServices.mjs"
import { validationResult } from "express-validator"
class StudentsController {
	static async renderList(req, res) {
		try {
			const data = await CourseDbServices.getList()
			res.render("courses/coursesList", { courses: data })
		} catch (error) {
			res.status(500).json({ error: err.message })
		}
	}
	static async renderForm(req, res) {
		try {
			const id = req.params?.id
			let data = null
			const studentsList = await StudentDbServices.getList()
			const seminarsList = await SeminarDbServices.getList()
			if (id) {
				data = await CourseDbServices.getById(id)
				res.render("courses/courseForm", { course: data, seminarsList, studentsList, errors: [] })
			} else {
				res.render("courses/courseForm", { course: null, seminarsList, studentsList, errors: [] })
			}
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}
	static async formAction(req, res) {
		let data = req.body
		const id = req.params?.id
		const errors = validationResult(req)
		if (typeof data.studentsList === "string") data.studentsList = [data.studentsList]

		if (typeof data.seminarsList === "string") data.seminarsList = [data.seminarsList]

		data.studentsList = data.studentsList || []
		data.seminarsList = data.seminarsList || []
		console.log("errors==>>", errors)
		if (!errors.isEmpty()) {
			if (id) {
				data._id = id
			}
			const studentsList = await StudentDbServices.getList()
			const seminarsList = await SeminarDbServices.getList()
			console.log("data=>>>>", data)
			return res.render("courses/courseForm", {
				course: data,
				studentsList,
				seminarsList,
				errors: errors.array(),
			})
		}
		console.log("data=>>>>>", data)
		try {
			if (id) {
				CourseDbServices.update(id, data)
				res.redirect("/courses")
			} else {
				CourseDbServices.create(data)
				res.redirect("/courses")
			}
		} catch (error) {
			res.status(500).render("courses/coursesForm", {
				errors: [{ msg: error.message }],
				student: data,
			})
		}
	}
	static async deleteAction(req, res) {
		try {
			await CourseDbServices.deleteById(req.body?.id)
			res.json({ success: true })
		} catch (error) {
			res.status(500).json({ success: false, message: "Failed to delete user" })
		}
	}
}
export default StudentsController
