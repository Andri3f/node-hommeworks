import mongoose from "mongoose"
import config from "../../config/default.mjs"
const { Schema } = mongoose

const typeSchema = new Schema({
	title: {
		type: String,
		required: [true, "Name is required"],
		minlength: [3, "Name must be at least 3 characters long"],
		maxlength: [50, "Name must be at most 50 characters long"],
		trim: true,
	},
})

typeSchema.statics.checkDatabaseExists = async () => {
	const databases = await mongoose.connection.listDatabases()
	return databases.databases.some((db) => db.name === config.databaseName)
}
typeSchema.statics.checkCollectionExists = async function () {
	if (await this.checkDatabaseExists()) {
		const collections = await mongoose.connection.db.listCollections({ name: "types" }).toArray()
		return collections.length > 0
	}
	return false
}
const Type = mongoose.model("Type", typeSchema)
export default Type
