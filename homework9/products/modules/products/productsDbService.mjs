import Product from "./Product.mjs"
import MongooseCRUDManager from "../MongooseCRUDManager.mjs"

class ProductDbService extends MongooseCRUDManager {
	async getList(sortData = {}) {
		try {
			console.log("=====sortData=========>>>>>", sortData)
			const listData = await this.model.find().sort(sortData).exec()
			return listData.map((doc) => doc.toObject())
		} catch (error) {
			console.error("Error fetching sorted list:", error)
			return []
		}
	}
}

export default new ProductDbService(Product)
