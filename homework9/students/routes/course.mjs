import { Router } from "express"
import coursesController from "../controllers/coursesController.mjs"
import CourseValidation from "../validations/CourseValidation.mjs"
const router = Router()
router.get("/", coursesController.renderList)
router.post("/:id?", CourseValidation.courseValidationRules, coursesController.formAction)
router.get("/form/:id?", coursesController.renderForm)
router.delete("/", coursesController.deleteAction)

export default router
