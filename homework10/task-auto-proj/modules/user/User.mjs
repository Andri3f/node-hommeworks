import mongoose from "mongoose"
import config from "../../config/default.mjs"
import bcrypt from "bcryptjs"
const { Schema } = mongoose

const userSchema = new Schema({
	email: {
		type: String,
		require: [true, "email is required"],
		unique: true,
		validate: {
			validator: (value) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value),
			message: "Invalid email format",
		},
	},
	password: {
		type: String,
		required: [true, "Password is required"],
		minlength: [6, "Password must be at least 6 characters long"],
	},
	type: {
		type: Schema.Types.ObjectId,
		ref: "Type",
	},
})

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next()
	}
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
	next()
})
userSchema.statics.checkDatabaseExists = async () => {
	const databases = await mongoose.connection.listDatabases()
	return databases.databases.some((db) => db.name === config.databaseName)
}
userSchema.statics.checkCollectionExists = async function () {
	if (await this.checkDatabaseExists()) {
		const collections = await mongoose.connection.db.listCollections({ name: "users" }).toArray()
		return collections.length > 0
	}
	return false
}
const User = mongoose.model("User", userSchema)
export default User
