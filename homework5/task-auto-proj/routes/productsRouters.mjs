import { Router } from "express"
import ProductsController from "../controllers/productsController.mjs"
import uploadManager from "../utils/uploadManager.mjs"
//import multer from "multer"
import { v4 as uuidv4 } from "uuid"
//const storage = multer.diskStorage({
//	destination: function (req, file, cb) {
//		cb(null, "uploads")
//	},
//	filename: function (req, file, cb) {
//		cb(null, uuidv4() + "-" + file.originalname)
//	},
//})
//const upload = multer({ storage })

const router = Router()
router.get("/", ProductsController.productsRender)
router.get("/create", ProductsController.renderNewCarPage)
router.get("/:id", ProductsController.renderUpdatePage)
router.post("/", uploadManager.getUploadStorage("uploads").single("imgSrc"), ProductsController.createNewProd)
router.post("/:id", uploadManager.getUploadStorage("uploads").single("imgSrc"), ProductsController.updateProdData)
router.delete("/", ProductsController.deleteProd)

export default router
