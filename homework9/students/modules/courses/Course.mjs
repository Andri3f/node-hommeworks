import mongoose from "mongoose"
import config from "../../config/default.mjs"

const { Schema } = mongoose

const courseSchema = new Schema({
	title: {
		type: String,
		require: [true, "title is require"],
		inlength: [3, "title must be at least 3 characters long"],
		maxlength: [15, "title must be at most 15 characters long"],
		trim: true,
	},
	duration: {
		type: Number,
		required: [true, "duration is required"],
		min: [50, "duration must be at least 50 hours"],
		max: [300, "duration must be at most 300 hours"],
		toInt: true,
	},
	studentsList: [
		{
			type: Schema.Types.ObjectId,
			ref: "Student",
		},
	],
	seminarsList: [
		{
			type: Schema.Types.ObjectId,
			ref: "Seminar",
		},
	],
})

courseSchema.static.checkDatabaseExists = async () => {
	const databases = await mongoose.connection.listDatabases()
	return databases.databases.some((db) => db.name === config.databaseName)
}

courseSchema.static.checkCollectionExists = async function () {
	if (await this.checkDatabaseExists()) {
		const collections = await mongoose.connection.db.listCollections({ name: "courses" }).toArray()
		return collections.length > 0
	}
	return false
}

const Course = mongoose.model("Course", courseSchema)
export default Course
