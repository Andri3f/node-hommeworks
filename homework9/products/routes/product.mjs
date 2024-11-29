import { Router } from "express"
import productController from "../controllers/productController.mjs"
import productValidator from "../validators/productValidation.mjs"
const router = Router()
router.get("/", productController.loadList)
router.get("/add", productController.renderForm)
router.post("/add", productValidator.productValidation, productController.addProduct)
router.delete("/", productController.deleteProd)

export default router
