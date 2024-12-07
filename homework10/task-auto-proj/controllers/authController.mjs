import passport from "passport"
import { validationResult } from "express-validator"
import userDbServices from "../modules/user/userDbServices.mjs"
import typeDbServices from "../modules/type/typeDbServices.mjs"
class authController {
	static renderLogin(req, res) {
		res.render("auth/authForm", { authType: "login", errors: [] })
	}
	static renderRegister(req, res) {
		res.render("auth/authForm", { authType: "register", errors: [] })
	}

	static async registerAction(req, res) {
		const errors = validationResult(req)
		console.log("errors===", errors)
		if (!errors.isEmpty()) {
			return res.status(400).render("auth/authForm", {
				errors: errors.array(),
				authType: "register",
			})
		}
		const { email, password } = req.body
		try {
			const existUser = await userDbServices.findOne({ email }, { password: 0 })
			if (existUser) {
				return res.render("auth/authForm", {
					errors: [
						{
							msg: "account already exist try to login",
						},
					],
					authType: "register",
				})
			}
			const userTypeId = await typeDbServices.findOne({ title: "user" })
			console.log("userTypeId=======>>", userTypeId)
			const newUser = await userDbServices.create({ email, password, type: userTypeId._id })
			req.login(newUser, (err) => {
				if (err) return next(err)
				return res.redirect("/cars")
			})
		} catch (error) {
			res.status(500).render("auth/register", {
				errors: [{ msg: error.message }],
			})
		}
	}
	static loginAction(req, res, next) {
		const errors = validationResult(req)
		console.log("errors===", errors)
		if (!errors.isEmpty()) {
			return res.status(400).render("auth/authForm", {
				errors: errors.array(),
				authType: "login",
			})
		}
		passport.authenticate("local", (err, user, info) => {
			if (err) {
				return next(err)
			}
			if (!user) {
				return res.render("auth/authForm", {
					authType: "login",
					errors: [{ msg: info.message }],
				})
			}
			req.logIn(user, (err) => {
				if (err) {
					return next(err)
				}
				return res.redirect("/cars")
			})
		})(req, res, next)
	}
	static logoutAction(req, res) {
		req.logout((err) => {
			if (err) {
				return next(err)
			}
			res.redirect("/cars")
		})
	}
}

export default authController
