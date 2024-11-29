import ProductsDbService from "../modules/products/productsDbService.mjs"
import { validationResult } from "express-validator"
class ProductController {
	static async loadList(req, res) {
		try {
			const sortData = req.session.sort || {}
			console.log("sortData===>>", sortData)
			const prodList = await ProductsDbService.getList(sortData)
			res.render("products/productsListView", { productsList: prodList })
		} catch (error) {}
	}
	static renderForm(req, res) {
		res.render("products/addProduct", { errors: [], data: {} })
	}
	static async addProduct(req, res) {
		const errors = validationResult(req)
		const data = req.body
		console.log("errors", errors)
		if (!errors.isEmpty()) {
			return res.status(400).render("products/addProduct", {
				errors: errors.array(),
				data,
			})
		}
		try {
			const { title, price, amount } = req.body
			if (title && price && amount) {
				await ProductsDbService.create({ title, price, amount })
				req.session.sort = { price: -1 }
				res.redirect("/products")
			}
		} catch (error) {
			res.status(500).render("products/addProduct", {
				errors: [{ msg: error.message }],
				data,
			})
		}
	}
	static async deleteProd(req, res) {
		try {
			const id = req.body?.id
			await ProductsDbService.deleteById(id)
			res.json({ success: true })
		} catch (error) {
			res.status(500).json({ success: false, message: "Failed to delete prod" })
		}
	}
}
export default ProductController
