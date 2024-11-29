import UserDbServices from "../modules/users/UserDbServices.mjs"
import { validationResult } from "express-validator"

class LoginController {
	static renderLoginPage(req, res) {
		if (req.session.userName) return res.redirect("/products")
		res.render("login", {
			errors: [],
			data: null,
		})
	}
	static logout(req, res) {
		req.session.userName = null
		res.redirect("/")
	}
	static async addUser(req, res) {
		const errors = validationResult(req)
		const data = req.body
		console.log("errors", errors)
		if (!errors.isEmpty()) {
			return res.status(400).render("login", {
				errors: errors.array(),
				data,
			})
		}

		try {
			const { userName, password } = req.body
			if (userName && password) {
				req.session.userName = userName
				req.session.sort = { price: 1 }
				UserDbServices.create({ userName, password })
				res.redirect("/products")
			}
		} catch (error) {
			res.status(500).render("login", {
				errors: [{ msg: error.message }],
				data,
			})
		}
	}
}
export default LoginController
