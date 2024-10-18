import { Router } from "express"

const router = Router()
router.get("/", (req, res) => {
	res.render("goals", { title: "My goals page", text: "my main goal now is to become a programer" })
})

export default router
