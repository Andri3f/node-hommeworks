import mongoose from "mongoose"
import config from "../../config/default.mjs"
import { Schema } from "mongoose"

const productSchema = new Schema({
	title: {
		type: String,
		required: [true, "title is required"],
		minLength: [3, "title must be at least 3 characters long"],
		maxLength: [8, "title must be at most 8 characters long"],
		trim: true,
	},
	price: {
		type: Number,
		required: [true, "price is required"],
		min: [10, "Price must be at least 10"],
		max: [9999999999, "Price must be at most 9999999999"],
	},
	amount: {
		type: Number,
		required: [true, "amount is required"],
		min: [1, "Amount must be at least 1"],
		max: [100, "Amount must be at most 100"],
	},
})
productSchema.static.checkDatabaseExists = async () => {
	const databases = await mongoose.connection.listDatabases()
	return databases.databases.some((db) => db.name === config.databaseName)
}

productSchema.static.checkCollectionExists = async function () {
	if (await this.checkDatabaseExists()) {
		const collections = await mongoose.connection.db.listCollections({ name: "products" }).toArray()
		return collections.length > 0
	}
	return false
}

const Product = mongoose.model("Product", productSchema)
export default Product
