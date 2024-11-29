import { Router } from "express"
import StudentsController from "../controllers/studentsController.mjs"
import StudentValidation from "../validations/StudentValidation.mjs"
const router = Router()
router.get("/", StudentsController.renderList)
router.post("/:id?", StudentValidation.studentValidationRules, StudentsController.formAction)
router.get("/form/:id?", StudentsController.renderForm)
router.delete("/", StudentsController.deleteAction)

export default router
