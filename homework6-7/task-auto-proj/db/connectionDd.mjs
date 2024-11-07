import config from "../config/default.mjs"
import mongoose from "mongoose"

export default async function () {
	try {
		await mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
		console.log("Успішно підключено до MongoDB")
	} catch (err) {
		console.error("Помилка підключення до MongoDB:", err)
	}
}
