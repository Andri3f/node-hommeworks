import express from "express"
import carController from "../controllers/carController.mjs"
import { checkSchema } from "express-validator"
import { ensureAdmin, ensureAuthenticated } from "../middleware/auth.mjs"
import carValidator from "../validator/carValidator.mjs"
import upload from "../middleware/UploadManager.mjs"

const router = express.Router()
router.get("/", carController.productsRender)
router.get("/create/:id?", ensureAuthenticated, ensureAdmin, carController.renderForm)
router.post("/create/:id?", ensureAuthenticated, ensureAdmin, upload.single("imgSrc"), checkSchema(carValidator.carValidationSchema), carController.formAction)
router.delete("/", ensureAuthenticated, ensureAdmin, carController.deleteProd)

export default router
