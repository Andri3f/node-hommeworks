import Car from "./Car.mjs"
class CarDbServices {
	static async getList(filters) {
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
	//static async getList(filters) {
	//	try {
	//		const exists = await Car.checkCollectionExists()
	//		if (exists) {
	//			const query = {}

	//			if (filters.minPrice || filters.maxPrice) {
	//				query.price = {}
	//				if (filters.minPrice) query.price.$gte = filters.minPrice
	//				if (filters.maxPrice) query.price.$lte = filters.maxPrice
	//			}

	//			if (filters.title) {
	//				query.title = { $regex: filters.title, $options: "i" }
	//			}

	//			const data = await Car.find(query, { title: 1, price: 1, owner: 1 }).populate("owner")
	//			return data
	//		}

	//		return []
	//	} catch (error) {
	//		console.log("error", error)
	//		return []
	//	}
	//}
	static async create(data) {
		const car = new Car(data)
		return await car.save()
	}
	static async getById(id) {
		return await Car.findById(id)
	}
	static async update(id, data) {
		return await Car.findByIdAndUpdate(id, data, {
			new: true,
			runValidators: true,
		})
	}
	static async deleteById(id) {
		return await Car.findByIdAndDelete(id)
	}
}
export default CarDbServices
