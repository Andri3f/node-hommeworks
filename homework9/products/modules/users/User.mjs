import mongoose from "mongoose"
import config from "../../config/default.mjs"
import { Schema } from "mongoose"

const userSchema = new Schema({
	userName: {
		type: String,
		required: [true, "name is required"],
		minLength: [3, "name must be at least 3 characters long"],
		maxLength: [8, "name must be at most 8 characters long"],
		trim: true,
	},
	password: {
		type: String,
		required: [true, "Password is required"],
		minlength: [8, "Password must be at least 8 characters long"],
		maxlength: [16, "Password must be at most 16 characters long"],
		validate: {
			validator: function (value) {
				return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value)
			},
			message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
		},
	},
})
userSchema.static.checkDatabaseExists = async () => {
	const databases = await mongoose.connection.listDatabases()
	return databases.databases.some((db) => db.name === config.databaseName)
}

userSchema.static.checkCollectionExists = async function () {
	if (await this.checkDatabaseExists()) {
		const collections = await mongoose.connection.db.listCollections({ name: "users" }).toArray()
		return collections.length > 0
	}
	return false
}

const Product = mongoose.model("User", userSchema)
export default Product
