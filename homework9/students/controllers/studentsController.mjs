import StudentDbServices from "../modules/students/StudentDbServices.mjs"
import { validationResult } from "express-validator"
class StudentsController {
	static async renderList(req, res) {
		try {
			const data = await StudentDbServices.getList()
			console.log("data=>>>", data)
			res.render("students/studentsList", { students: data })
		} catch (error) {
			res.status(500).json({ error: err.message })
		}
	}
	static async renderForm(req, res) {
		try {
			const id = req.params?.id
			let data = null
			if (id) {
				data = await StudentDbServices.getById(id)
				res.render("students/studentForm", { student: data, errors: [] })
			} else {
				res.render("students/studentForm", { student: null, errors: [] })
			}
		} catch (error) {
			res.status(500).json({ error: err.message })
		}
	}
	static formAction(req, res) {
		let data = req.body
		const id = req.params?.id
		const errors = validationResult(req)
		console.log("errors==>>", errors)
		if (!errors.isEmpty()) {
			if (id) {
				data._id = id
			}
			return res.render("students/studentForm", {
				student: data,
				errors: errors.array(),
			})
		}
		try {
			if (id) {
				StudentDbServices.update(id, data)
				res.redirect("/students")
			} else {
				StudentDbServices.create(data)
				res.redirect("/students")
			}
		} catch (error) {
			res.status(500).render("students/studentForm", {
				errors: [{ msg: error.message }],
				student: data,
			})
		}
	}
	static async deleteAction(req, res) {
		try {
			await StudentDbServices.deleteById(req.body?.id)
			res.json({ success: true })
		} catch (error) {
			res.status(500).json({ success: false, message: "Failed to delete user" })
		}
	}
}
export default StudentsController
