import mongoose from "mongoose"
import config from "../../config/default.mjs"
const { Schema } = mongoose

const carSchema = new Schema({
	title: {
		type: String,
		require: [true, "title is require"],
		minlength: [5, "Name must be at least 5 characters long"],
		maxlength: [8, "Name must be at most 8 characters long"],

		trim: true,
	},
	price: {
		type: Number,
		require: [true, "price is require"],
	},
	year: {
		type: Number,
		require: [true, "year is require"],
	},
	imgSrc: {
		type: String,
	},
})

carSchema.statics.checkDatabaseExists = async () => {
	const databases = await mongoose.connection.listDatabases()
	return databases.databases.some((db) => db.name === config.databaseName)
}
carSchema.statics.checkCollectionExists = async function () {
	if (await this.checkDatabaseExists()) {
		const collections = await mongoose.connection.db.listCollections({ name: "cars" }).toArray()
		return collections.length > 0
	}
	return false
}
//console.log("carSchema=========>>>>>>>>>>>>>>>>>>", carSchema)
const Car = mongoose.model("Car", carSchema)
export default Car
