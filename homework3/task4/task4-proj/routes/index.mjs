import { Router } from "express"

const router = Router()
router.get("/", (req, res) => {
	res.render("index", { title: "It is prototype of shop" })
})

export default router
