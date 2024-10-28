import productsModel from "../modules/productsModule.mjs"
class ProductsController {
	static convertDataToNum(obj) {
		obj.price = parseInt(obj.price)
		obj.year = parseInt(obj.year)
		return obj
	}
	static productsRender(req, res) {
		res.render("productsViews/productsList", { carsList: productsModel.getAllProducts() })
	}
	static renderNewCarPage(req, res) {
		res.render("productsViews/addNewCar", { car: null })
	}
	static createNewProd(req, res) {
		let data = ProductsController.convertDataToNum(req.body)
		data.imgSrc = "/" + req.file.filename
		productsModel.addProduct(data)
		res.redirect("/cars")
	}
	static deleteProd(req, res) {
		const id = req.body.id
		productsModel.deleteProdById(id)
		return res.json({ success: true })
	}
	static renderUpdatePage(req, res) {
		const id = req.params.id
		const car = productsModel.getProdById(id)

		res.render("productsViews/addNewCar", { car })
	}
	static updateProdData(req, res) {
		const id = req.params.id
		const data = ProductsController.convertDataToNum(req.body)

		if (req.file) data.imgSrc = "/" + req.file?.filename
		else {
			const car = productsModel.getProdById(id)
			data.imgSrc = car.imgSrc
		}

		productsModel.updateProd(id, data)
		res.redirect("/cars")
	}
}
export default ProductsController
