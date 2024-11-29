import mongoose from "mongoose"
import config from "../../config/default.mjs"

const { Schema } = mongoose

const studentSchema = new Schema({
	name: {
		type: String,
		require: [true, "name is require"],
		inlength: [3, "Name must be at least 3 characters long"],
		maxlength: [15, "Name must be at most 15 characters long"],
		trim: true,
	},
	age: {
		type: Number,
		required: [true, "Age is required"],
		min: [17, "Age must be at least 17"],
		max: [50, "Age must be at most 50"],
		toInt: true,
	},
	averageScore: {
		type: Number,
		min: [6, "AaverageScore must be at least 6"],
		max: [12, "averageScore must be at most 6"],
	},
})

studentSchema.static.checkDatabaseExists = async () => {
	const databases = await mongoose.connection.listDatabases()
	return databases.databases.some((db) => db.name === config.databaseName)
}

studentSchema.static.checkCollectionExists = async function () {
	if (await this.checkDatabaseExists()) {
		const collections = await mongoose.connection.db.listCollections({ name: "students" }).toArray()
		return collections.length > 0
	}
	return false
}

const Student = mongoose.model("Student", studentSchema)
export default Student
