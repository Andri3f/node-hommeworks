import { validationResult } from "express-validator"
import carsDbServices from "../modules/car/carsDbServices.mjs"
import ownerDbServices from "../modules/owner/OwnerDbServices.mjs"
import uploadManager from "../utils/uploadManager.mjs"
class CarController {
	static async productsRender(req, res) {
		try {
			let filters = {}
			for (const key in req.query) {
				if (req.query[key]) filters[key] = req.query[key]
			}
			console.log("filters===========>>>>>>", filters)
			const dataList = await carsDbServices.getList(filters)
			res.render("carViews/carsList", {
				carsList: dataList,
				filters,
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
			const owners = await ownerDbServices.getList()
			console.log("owners=====>>>>>>", owners)
			console.log("car=========================", data)

			res.render("carViews/addNewCar", {
				errors: [],
				car: data,
				owners,
			})
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}
	static async deleteProd(req, res) {
		try {
			const id = req.body.id
			let data = await carsDbServices.deleteById(id)
			if (data.imgSrc) {
				uploadManager.deleteImgFile("uploads", data.imgSrc)
			}
			res.json({ success: true })
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}
	static async formAction(req, res) {
		const errors = validationResult(req)
		let imgSrc = null
		console.log("req.file.path===========>>>>>", req?.file?.path)
		if (req.file) imgSrc = req.file?.filename
		let data = req.body
		const owners = await ownerDbServices.getList()
		data.imgSrc = imgSrc
		if (!errors.isEmpty()) {
			if (req.params.id) data.id = req.params.id
			return res.status(400).render("carViews/addNewCar", {
				errors: errors.array(),
				car: data,
				owners,
			})
		}
		try {
			const id = req.params.id

			const { title, year, price, owner } = req.body
			if (id) {
				const currentImage = carsDbServices
				if (!imgSrc) carsDbServices.update(id, { title, year, price })
				else {
					const oldItem = await carsDbServices.getById(id)
					console.log("oldImgSrc==========", oldItem.imgSrc)
					uploadManager.deleteImgFile("uploads", oldItem.imgSrc)
					carsDbServices.update(id, { title, year, price, imgSrc, owner })
				}
			} else {
				carsDbServices.create({ title, year, price, imgSrc, owner })
			}
			res.redirect("/cars")
		} catch (error) {
			console.log("error==============", error)
			res.status(500).render("carViews/addNewCar", {
				errors: [{ msg: error.message }],
				data,
				owners,
			})
		}
	}
}
export default CarController
