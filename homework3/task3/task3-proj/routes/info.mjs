import { Router } from "express"

const router = Router()
router.get("/:myLinks", (req, res) => {
	const myInks = req.params.myLinks

	if (myInks === "sites") res.render("sites", { title: "My favorite sites" })
	else if (myInks === "films") res.render("films", { title: "My Favorite Online Cinemas" })
	else if (myInks === "me") res.render("me", { title: "About me" })
	else res.render("customError", { status: "404", text: "incorrect path" })
})

export default router
