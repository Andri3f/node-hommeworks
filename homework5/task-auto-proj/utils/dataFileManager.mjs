import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import settings from "../settings.mjs"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
class DataFileManager {
	constructor(filePath) {
		this.filePath = filePath
	}
	saveData(dataArr) {
		try {
			fs.writeFileSync(this.filePath, JSON.stringify(dataArr), "utf8")
		} catch (err) {
			throw new Error(`Помилка при збереженні даних: ${err.message}`)
		}
	}
	loadData() {
		try {
			const data = fs.readFileSync(this.filePath, "utf8")
			return JSON.parse(data)
		} catch (err) {
			if (err.code === "ENOENT") {
				this.saveData([])
				return []
			} else {
				throw new Error(`Помилка при зчитуванні даних: ${err.message}`)
			}
		}
	}
	addItem(item) {
		try {
			if (!item) {
				throw new Error(`Об'єкт не передано`)
			}
			const data = this.loadData()
			data.push(item)
			this.saveData(data)
		} catch (err) {}
	}
	getItemById(id) {
		try {
			const data = this.loadData()
			const item = data.find((item) => item.id == id)
			if (!item) {
				throw new Error(`Об'єкт з id ${id} не знайдено`)
			}
			return item
		} catch (err) {
			throw new Error(`Помилка при пошуку об'єкта: ${err.message}`)
		}
	}
	updateItemById(id, updatedProperties) {
		try {
			const data = this.loadData()
			const index = data.findIndex((item) => item.id == id)
			if (index !== -1) {
				const oldImgSrc = data[index].imgSrc
				data[index] = { ...data[index], ...updatedProperties }
				this.saveData(data)
				if (oldImgSrc !== updatedProperties.imgSrc && oldImgSrc) {
					const filePath = path.join(__dirname, "../uploads", oldImgSrc)
					this.deleteImageFromFile(filePath)
				}
				return true
			} else {
				throw new Error(`Об'єкт з id ${id} не знайдено`)
			}
		} catch (err) {
			throw new Error(`Помилка при оновленні об'єкта: ${err.message}`)
		}
	}
	deleteImageFromFile(filePath) {
		if (fs.existsSync(filePath)) {
			fs.unlink(filePath, (err) => {
				if (err) {
					console.error(`Помилка при видаленні файлу: ${err.message}`)
				} else {
					console.log(`Файл ${filePath} успішно видалено`)
				}
			})
		} else {
			console.log(`Файл ${filePath} не знайдено`)
		}
	}

	deleteItemById(id) {
		try {
			const data = this.loadData()

			const newData = data.filter((item) => {
				if (item.id != id) return true
				const oldImgSrc = item.imgSrc
				const filePath = path.join(__dirname, "../uploads", oldImgSrc)
				this.deleteImageFromFile(filePath)
				return false
			})

			if (newData.length === data.length) {
				throw new Error(`Об'єкт з id ${id} не знайдено`)
			}
			this.saveData(newData)
		} catch (err) {
			throw new Error(`Помилка при видаленні об'єкта: ${err.message}`)
		}
	}
}
export default new DataFileManager(settings.dataPath)
