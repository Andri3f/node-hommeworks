import productsModule from "../models/productsModel.mjs"
class ProductsController {
	static convertPriceToNumber(obj) {
		if (obj && obj.price) {
			obj.price = parseFloat(obj.price)
		}
	}

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
		const id = req.params.id
		const product = id ? productsModule.getProdById(id) : null
		res.render("productsViews/newProductView", { product })
	}
	static createNewProd(req, res) {
		const prodData = req.body
		ProductsController.convertPriceToNumber(prodData)
		productsModule.addProduct(prodData)
		res.redirect("/products")
	}

	static deleteProd(req, res) {
		const { id } = req.body
		try {
			productsModule.deleteProdById(id)
			return res.json({ success: true })
		} catch (error) {
			return res.status(500).json({ success: false, message: "Failed to delete product" })
		}
	}
	static updateProd(req, res) {
		const id = req.params.id
		const product = req.body
		ProductsController.convertPriceToNumber(product)
		productsModule.updateProd(id, product)
		res.redirect("/products")
	}
}
export default ProductsController
