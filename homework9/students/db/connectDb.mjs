import config from "../config/default.mjs"
import mongoose from "mongoose"
export default async function () {
	try {
		await mongoose.connect(config.mongoURI, {})
		console.log("Sucsessfuly connected to MongoDB")
	} catch (err) {
		console.error("Problem with connecting to MongoDB:", err)
	}
}
