import { Router } from "express"

function getSeason() {
	const month = new Date().getMonth()
	if (month <= 1 || month === 11) return "Winter"
	else if (month <= 4) return "Spring"
	else if (month <= 7) return "Summer"
	return "Fall"
}

const router = Router()
router.get("/", (req, res) => {
	const season = getSeason()
	res.render("season", { monthTitle: season })
})

export default router
