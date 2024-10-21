import dataManager from "../utils/dataFileManager.mjs"
import { v4 as uuidv4 } from "uuid"
class productsModel {
	static getAllProducts() {
		try {
			return dataManager.loadData()
		} catch (err) {
			throw new Error(err, "problem with getting all products")
		}
	}
	static getProdById(id) {
		try {
			return dataManager.getItemById(id)
		} catch (err) {
			throw new Error(err, "err with getting prod by id")
		}
	}
	static addProduct(newProd) {
		try {
			dataManager.addItem({ id: uuidv4(), ...newProd })
		} catch (err) {
			throw new Error(err, "err with getting prod by id")
		}
	}
	static deleteProdById(id) {
		try {
			dataManager.deleteItemById(id)
		} catch (err) {
			throw new Error(err, "err with deleting prod")
		}
	}
}
export default productsModel
