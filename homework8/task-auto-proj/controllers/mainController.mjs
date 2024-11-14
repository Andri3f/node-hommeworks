import { fileURLToPath } from "url"
import path from "path"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
class MainController {
	static async homeRender(req, res) {
		res.sendFile(path.join(__dirname, "../public/html/index.html"))
	}
}

export default MainController
