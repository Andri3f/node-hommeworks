import { createServer } from "node:http"
import fs from "fs"
function readFile(res, filePath) {
	try {
		const data = fs.readFileSync(filePath)
		res.writeHead(200, { "Content-Type": "text/html" })
		res.end(data)
	} catch (err) {
		res.writeHead(500, { "Content-Type": "text/txt" })
		res.end("Problem with reading file")
	}
}
const pathAnfFiles = {
	"/": "home.html",
	"/coffee": "coffee.html",
	"/music": "music.html",
}
function getFilePath(path) {
	return pathAnfFiles[path]
}
const server = createServer((req, res) => {
	let filePath = getFilePath(req.url)
	if (fs.existsSync(filePath)) {
		readFile(res, filePath)
	} else if (filePath === "") {
		readFile(res, "home.html")
	} else {
		res.writeHead(404, { "Content-Type": "text/txt" })
		res.end("no such file")
	}
})
server.listen(3000, "127.0.0.1", () => {
	console.log("Listening on 127.0.0.1:3000")
})
