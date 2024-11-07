import { Router } from "express"
import carController from "../controllers/carController.mjs"
import { checkSchema } from "express-validator"
import carValidator from "../validator/carValidator.mjs"
import uploadManager from "../utils/uploadManager.mjs"

const router = Router()
router.get("/", carController.productsRender)
router.get("/create/:id?", carController.renderForm)
router.post("/create/:id?", uploadManager.getUploadStorage("uploads").single("imgSrc"), checkSchema(carValidator.carValidationSchema), carController.formAction)
router.delete("/", carController.deleteProd)

export default router
