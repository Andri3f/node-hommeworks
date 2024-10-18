import { Router } from "express"

const router = Router()
router.get("/", (req, res) => {
	res.render("index", { title: "home Page", welcome: "welcome my friend" })
})

export default router
