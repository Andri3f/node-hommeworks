import Car from "./Car.mjs"
import MongooseCRUDManager from "../MongooseCRUDManager.mjs"
class CarDbServices extends MongooseCRUDManager {
	async getList(filters) {
		try {
			const exists = await Car.checkCollectionExists()
			if (exists) {
				let query = Car.find().populate("owner")
				query.select("owner price title year, imgSrc")
				if (filters.minPrice) query = query.where("price").gte(filters.minPrice)

				if (filters.maxPrice) query = query.where("price").lte(filters.maxPrice)

				if (filters.title) query = query.where("title").regex(new RegExp(filters.title, "i"))

				const data = await query.exec()
				return data
			}

			return []
		} catch (error) {
			console.log("error", error)
			return []
		}
	}
}
export default new CarDbServices(Car)
