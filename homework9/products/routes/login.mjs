import { Router } from "express"
import UserValidators from "../validators/userValidators.mjs"
import loginController from "../controllers/loginController.mjs"
const router = Router()

router.get("/", loginController.renderLoginPage)
router.get("/logout", loginController.logout)
router.post("/", UserValidators.userValidation, loginController.addUser)

export default router
