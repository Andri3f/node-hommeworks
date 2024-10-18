import { Router } from "express"
import productsList from "../data/products.json" assert { type: "json" }
const router = Router()
router.get("/", (req, res) => {
	res.render("products", { title: "Products list", prodList: productsList })
})
router.get("/add", (req, res) => {
	res.render("addProduct", { title: "Here you can add new product" })
})

export default router
