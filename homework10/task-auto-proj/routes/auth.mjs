import { Router } from "express"
import AuthController from "../controllers/authController.mjs"
import AuthValidator from "../validator/authValidation.mjs"
const router = Router()

router.get("/login", AuthController.renderLogin)
router.get("/register", AuthController.renderRegister)
router.post("/login", AuthValidator.loginValidator, AuthController.loginAction)
router.post("/register", AuthValidator.registrationValidator, AuthController.registerAction)
router.get("/logout", AuthController.logoutAction)

export default router
