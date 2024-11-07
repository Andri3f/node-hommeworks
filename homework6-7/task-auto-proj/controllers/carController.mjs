import { validationResult } from "express-validator"
import carsDbServices from "../modules/car/carsDbServices.mjs"
import uploadManager from "../utils/uploadManager.mjs"
class CarController {
	static async productsRender(req, res) {
		try {
			const dataList = await carsDbServices.getList()
			res.render("carViews/carsList", {
				carsList: dataList,
			})
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}
	static async renderForm(req, res) {
		try {
			const id = req.params.id
			let data = null
			if (id) {
				data = await carsDbServices.getById(id)
			}
			res.render("carViews/addNewCar", {
				errors: [],
				car: data,
			})
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}
	static async deleteProd(req, res) {
		try {
			const id = req.body.id
			let data = await carsDbServices.deleteById(id)
			uploadManager.deleteImgFile("uploads", data.imgSrc)
			res.json({ success: true })
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}
	static async formAction(req, res) {
		const errors = validationResult(req)
		let imgSrc = null
		if (req.file) imgSrc = "/" + req.file?.filename
		let data = req.body
		data.imgSrc = imgSrc
		if (!errors.isEmpty()) {
			if (req.params.id) data.id = req.params.id
			return res.status(400).render("carViews/addNewCar", {
				errors: errors.array(),
				car: data,
			})
		}
		try {
			const id = req.params.id

			const { title, year, price } = req.body
			if (id) {
				const currentImage = carsDbServices
				if (!imgSrc) carsDbServices.update(id, { title, year, price })
				else {
					const oldItem = await carsDbServices.getById(id)
					console.log("oldImgSrc==========", oldItem.imgSrc)
					uploadManager.deleteImgFile("uploads", oldItem.imgSrc)
					carsDbServices.update(id, { title, year, price, imgSrc })
				}
			} else {
				carsDbServices.create({ title, year, price, imgSrc })
			}
			res.redirect("/cars")
		} catch (error) {
			console.log("error==============", error)
			res.status(500).render("carViews/addNewCar", {
				errors: [{ msg: error.message }],
				data,
			})
		}
	}
}
export default CarController
