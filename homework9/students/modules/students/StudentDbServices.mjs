import Student from "../students/Student.mjs"
import MongooseCRUDManager from "../MongooseCRUDManager.mjs"

class StudentDbServices extends MongooseCRUDManager {}

export default new StudentDbServices(Student)
