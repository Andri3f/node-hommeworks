import mongoose from "mongoose"
import config from "../../config/default.mjs"

const { Schema } = mongoose

const seminarSchema = new Schema({
	topic: {
		type: String,
		require: [true, "title is require"],
		minlength: [3, "topic must be at least 3 characters long"],
		trim: true,
	},
	duration: {
		type: Number,
		required: [true, "duration is required"],
		min: [1, "duration must be at least 1 hours"],
		max: [5, "duration must be at most 5 hours"],
		toInt: true,
	},
	responsibleStudent: {
		type: Schema.Types.ObjectId,
		ref: "Students",
	},
})

seminarSchema.static.checkDatabaseExists = async () => {
	const databases = await mongoose.connection.listDatabases()
	return databases.databases.some((db) => db.name === config.databaseName)
}

seminarSchema.static.checkCollectionExists = async function () {
	if (await this.checkDatabaseExists()) {
		const collections = await mongoose.connection.db.listCollections({ name: "seminars" }).toArray()
		return collections.length > 0
	}
	return false
}

const Seminar = mongoose.model("Seminar", seminarSchema)
export default Seminar
