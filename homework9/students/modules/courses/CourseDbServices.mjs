import Course from "./Course.mjs"
import MongooseCRUDManager from "../MongooseCRUDManager.mjs"

class CourseDbServices extends MongooseCRUDManager {
	async getList() {
		try {
			const populateFields = [
				{ fieldForPopulation: "studentsList", requiredFieldsFromTargetObject: "name _id" },
				{ fieldForPopulation: "seminarsList", requiredFieldsFromTargetObject: "topic" },
			]
			const courses = await super.getList({}, null, populateFields)
			return courses
		} catch (error) {
			return []
		}
	}
}

export default new CourseDbServices(Course)
