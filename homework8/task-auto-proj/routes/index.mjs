import { Router } from "express"
import MainController from "../controllers/mainController.mjs"
const router = Router()
router.get("/", MainController.homeRender)

export default router
