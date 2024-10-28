import { fileURLToPath } from "url"
import path from "path"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
class MainController {
	static homeRender(req, res) {
		const filePath = path.join(__dirname, "..", "public", "html", "index.html")
		res.sendFile(filePath)
	}
}
export default MainController
