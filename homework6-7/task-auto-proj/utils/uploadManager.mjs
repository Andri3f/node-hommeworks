import multer from "multer"
import fs from "fs"
import { fileURLToPath } from "url"
import path from "path"

class UploadManager {
	static getUploadStorage(dirName = "uploads") {
		const storage = multer.diskStorage({
			destination: function (req, file, cb) {
				cb(null, dirName)
			},
			filename: function (req, file, cb) {
				cb(null, Date.now() + "-" + file.originalname)
			},
		})

		const upload = multer({ storage })
		return upload
	}
	static deleteImgFile(folder, file) {
		try {
			const imgFile = file.split("/").pop()
			const __filename = fileURLToPath(import.meta.url)
			const __dirname = path.dirname(__filename)
			const filePath = path.join(__dirname, `../${folder}/${imgFile}`)
			if (fs.existsSync(filePath)) {
				fs.unlinkSync(filePath)
			} else {
				throw new Error(`File ${imgFile} not found`)
			}
		} catch (error) {
			throw new Error("error", error)
		}
	}
}

export default UploadManager
