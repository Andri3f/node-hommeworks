import { Router } from "express"
function getCurrentDay() {
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
	const dayIndex = new Date().getDay()
	return days[dayIndex]
}

const router = Router()
router.get("/", (req, res) => {
	const day = getCurrentDay()
	res.render("day", { dayTitle: day })
})

export default router
