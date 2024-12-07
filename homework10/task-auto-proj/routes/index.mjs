import express from "express"
import mianRouters from "./mianRouters.mjs"
import carRouters from "./carRouters.mjs"
import authRouter from "./auth.mjs"
const router = express.Router()
router.use("/", mianRouters)
router.use("/cars", carRouters)
router.use("/auth", authRouter)
export default router
