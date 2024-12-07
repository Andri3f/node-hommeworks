import User from "./User.mjs"
import MongooseCRUDManager from "../MongooseCRUDManager.mjs"

class UserDbServices extends MongooseCRUDManager {
	async getList(filters) {
		try {
			const res = await super.getList(filters, { password: 0 }, ["type"])
			return res
		} catch (error) {
			return []
		}
	}
}

export default new UserDbServices(User)
