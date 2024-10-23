import { Router } from "express"
import prodController from "../controllers/productsController.mjs"
const router = Router()
router.get("/", prodController.productsAllPage)
router.get("/create", prodController.newProduct)
router.get("/edit/:id", prodController.newProduct)
router.get("/:id", prodController.specificProduct)
router.post("/", prodController.createNewProd)
router.post("/:id", prodController.updateProd)
router.delete("/", prodController.deleteProd)

export default router
