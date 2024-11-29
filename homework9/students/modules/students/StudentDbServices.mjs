import Student from "../students/Student.mjs"
import CourseDbServices from "../courses/CourseDbServices.mjs"
import SeminarDbServices from "../seminars/SeminarDbServices.mjs"
import MongooseCRUDManager from "../MongooseCRUDManager.mjs"

class StudentDbServices extends MongooseCRUDManager {
	async deleteById(id) {
		try {
			const deletedStudent = await super.deleteById(id)
			if (deletedStudent) {
				const seminarsList = await SeminarDbServices.getList()
				console.log("seminarsList======>>>", seminarsList)
				let deletedSeminar = null
				//for (const seminar of seminarsList) {
				//	if (seminar.responsibleStudent._id.toString() === deletedStudent._id.toString()) {
				//		console.log("seminar.responsibleStudent._id =======>>>", seminar.responsibleStudent._id)
				//		deletedSeminar = await SeminarDbServices.deleteById(seminar._id)
				//	}
				//}
				const coursesList = await CourseDbServices.getList()
				console.log("coursesList=====================", coursesList)
				for (const course of coursesList) {
					console.log("course=========", course)
					const studentsIds = course.studentsList.map((id) => id.toString())
					let newCourse = course
					console.log("studentsIds====================", studentsIds)
					console.log("deletedStudent===========", deletedStudent)
					if (studentsIds.includes(deletedStudent._id.toString())) {
						newCourse.studentsList = course.studentsList.filter((studentId) => studentId.toString() !== deletedStudent._id.toString())
					}
					const seminarIds = course.seminarsList.map((id) => id.toString())
					if (seminarIds.includes(deletedSeminar._id.toString())) {
						await CourseDbServices.updateById(course._id, {
							$pull: { seminarsList: deletedSeminar._id },
						})
					}
					await CourseDbServices.updateById(course._id, newCourse)
				}
			}
			return deletedStudent
		} catch (error) {
			return []
		}
	}
}

export default new StudentDbServices(Student)
