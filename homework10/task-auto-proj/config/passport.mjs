import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import bcrypt from "bcryptjs"
import User from "../modules/user/User.mjs"
import UsersDBService from "../modules/user/userDbServices.mjs"

// Налаштування локальної стратегії
passport.use(
	new LocalStrategy({ usernameField: "email", passwordField: "password" }, async (email, password, done) => {
		const user = await UsersDBService.findOne({ email }, {}, ["type"])
		console.log("email password", email, passport)
		console.log("user", user)
		try {
			if (!user) {
				return done(null, false, { message: "Incorrect email op password" })
			}
			const isMatch = await bcrypt.compare(password, user.password)
			if (!isMatch) {
				return done(null, false, { message: "Incorrect email op password" })
			}
			return done(null, user)
		} catch (error) {
			return done(error)
		}
	})
)

// Серіалізація користувача
passport.serializeUser((user, done) => {
	done(null, user._id)
})

// Десеріалізація користувача
passport.deserializeUser(async (id, done) => {
	try {
		// const user = await User.findById(id)
		const user = await UsersDBService.findOne({ _id: id }, {}, ["type"])
		done(null, user)
	} catch (error) {
		done(error)
	}
})

export default passport
