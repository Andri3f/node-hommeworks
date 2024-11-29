import { Router } from "express"

const router = Router()
router.get("/", (req, res) => {
	const isUser = req.session.userName ? true : false
	res.render("index", { title: "Home", isUser })
})

export default router
