import { Router } from "express"

function getTimeOfDay() {
	const hour = new Date().getHours()
	if (hour < 5 || hour >= 23) return "Night"
	else if (hour < 12) return "Morning"
	else if (hour < 18) return "Afternoon"
	return "Evening"
}

const router = Router()
router.get("/", (req, res) => {
	const partDay = getTimeOfDay()
	res.render("time", { partDayTitle: partDay })
})

export default router
