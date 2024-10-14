import { createServer } from "node:http"
import fs from "fs"
const numbersPath = "numbers.txt"
function getArrayFromFile(path, res) {
	try {
		const data = fs.readFileSync(path).toString()
		return data
			.slice(0, -1)
			.split(",")
			.map((item) => parseFloat(item))
	} catch (err) {
		handleError(res, "Problem with reading file(")
		return null
	}
}
function handleError(res, message) {
	res.writeHead(500, { "Content-Type": "text/plain" })
	res.end(`${message} \n`)
}
function handleSuccess(res, message) {
	res.writeHead(200, { "Content-Type": "text/plain" })
	res.end(`${message} \n`)
}
const server = createServer((req, res) => {
	const filePath = req.url
	if (/^\/save_num\/\d+(\.\d+)?$/.test(filePath)) {
		const number = filePath.match(/\/save_num\/(\d+(\.\d+)?)/)[1]
		fs.appendFileSync(numbersPath, `${number},`)
		handleSuccess(res, "Added new number successful")
	} else if (filePath === "/sum") {
		const arr = getArrayFromFile(numbersPath, res)
		if (arr) {
			const sum = arr.reduce((prevSum, num) => prevSum + num, 0)
			handleSuccess(res, `sum is ${sum}`)
		}
	} else if (filePath === "/mult") {
		const arr = getArrayFromFile(numbersPath, res)
		if (arr) {
			const mult = arr.reduce((prevMult, num) => prevMult * num)
			handleSuccess(res, `mult is ${mult}`)
		}
	} else if (filePath === "/remove") {
		try {
			fs.unlinkSync(numbersPath)
			handleSuccess(res, "File removed successful")
		} catch (err) {
			handleError(res, "Problem with deleting file")
		}
	} else {
		handleSuccess(res, "Hello, how are you?")
	}
})

server.listen(3000, "127.0.0.1", () => {
	console.log("Listening on 127.0.0.1:3000")
})
