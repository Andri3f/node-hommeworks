import mongoose from "mongoose"
import config from "../../config/default.mjs"
const { Schema } = mongoose

let ownerSchema = new Schema({
	firstName: {
		type: String,
		require: [true, "first name nust be required"],
		trim: true,
	},
	lastName: {
		type: String,
		require: [true, "second name nust be required"],
		trim: true,
	},
})
ownerSchema.set("toObject", { virtuals: true })
ownerSchema.set("toJSON", { virtuals: true })
ownerSchema
	.virtual("fullName")
	.get(function () {
		return `${this.firstName} ${this.lastName}`
	})
	.set(function (newFullName) {
		const nameParts = newFullName.split(" ")
		this.firstName = nameParts[0]
		this.lastName = nameParts[1]
	})
ownerSchema.statics.checkDatabaseExists = async () => {
	const databases = await mongoose.connection.listDatabases()
	return databases.databases.some((db) => db.name === config.databaseName)
}
ownerSchema.statics.checkCollectionExists = async function () {
	if (await this.checkDatabaseExists()) {
		const collections = await mongoose.connection.db.listCollections({ name: "owners" }).toArray()
		return collections.length > 0
	}
	return false
}
//console.log("carSchema=========>>>>>>>>>>>>>>>>>>", carSchema)
const Owner = mongoose.model("Owner", ownerSchema)
export default Owner
