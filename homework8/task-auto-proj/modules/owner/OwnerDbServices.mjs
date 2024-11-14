import Owner from "./Owner.mjs"

class OwnerDbServices {
	static async getList() {
		try {
			const exists = await Owner.checkCollectionExists()
			if (exists) {
				const data = await Owner.find({})
				return data
			}

			return []
		} catch (error) {
			console.log("error", error)
			return []
		}
	}
}
export default OwnerDbServices
