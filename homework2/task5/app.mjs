import { createServer } from "node:http"
import historyData from "./history.json" assert { type: "json" }
import settingsData from "./settings.json" assert { type: "json" }
import fs from "fs"

function saveHistoryData(filePath, data, routePAth, res) {
	fs.writeFileSync(filePath, JSON.stringify(data))
	res.writeHead(200, { "Content-Type": "text/txt" })
	res.end(`saved path ${routePAth}`)
}

const server = createServer((req, res) => {
	const filePath = req.url
	if (filePath === "/favicon.ico") {
		res.writeHead(204, { "Content-Type": "text/plain" })
		res.end()
		return
	}
	if (filePath === settingsData.historyRoute) {
		res.writeHead(200, { "Content-Type": "application/json" })
		res.end(JSON.stringify(historyData))
		return
	}
	if (fs.existsSync(settingsData.historyFilePath)) {
		if (historyData[filePath]) historyData[filePath]++
		else historyData[filePath] = 1
	}

	saveHistoryData(settingsData.historyFilePath, historyData, filePath, res)
})

server.listen(3000, "127.0.0.1", () => {
	console.log("Listening on 127.0.0.1:3000")
})
