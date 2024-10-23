import productsModule from "../models/productsModel.mjs"
class ProductsController {
	static productsAllPage(req, res) {
		const products = productsModule.getAllProducts()
		res.render("productsViews/productsView", { products })
	}
	static specificProduct(req, res) {
		const id = req.params.id
		const product = productsModule.getProdById(id)
		res.render("productsViews/specificProdView", { product })
	}
	static newProduct(req, res) {
		res.render("productsViews/newProductView")
	}
	static createNewProd(req, res) {
		const prodData = req.body
		productsModule.addProduct(prodData)
		res.redirect("/products")
	}
	static deleteProd(req, res) {
		const { id } = req.body
		console.log("----------id", id)
		productsModule.deleteProdById(id)
		return res.json({ success: true })
	}
}
export default ProductsController
