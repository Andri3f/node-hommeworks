import { createServer } from "node:http"

function handleSuccess(res, message) {
	res.writeHead(200, { "Content-Type": "text/plain" })
	res.end(`${message} \n`)
}

const server = createServer((req, res) => {
	const filePath = req.url

	if (/^\/(add|subtract|mult)\/.+/.test(filePath)) {
		const parts = filePath.split("/")
		const type = parts[1]
		const numbers = parts[2].split("-").map((item) => {
			if (/^\d+(\.\d+)?$/.test(item)) return parseFloat(item)
			else {
				res.writeHead(400, { "Content-Type": "text/plain" })
				res.end("Invalid numbers, there is not only numbers")
				return null
			}
		})
		// так читабильніше ні писати 1 регулярний вираз мені здається
		if (numbers.includes(null)) return

		let result
		if (type === "add") {
			result = numbers.reduce((prevSum, item) => item + prevSum, 0)
			handleSuccess(res, `add result is ${result}`)
		} else if (type === "subtract") {
			result = numbers.reduce((prevDifference, item) => prevDifference - item)
			handleSuccess(res, `subtract result is ${result}`)
		} else {
			result = numbers.reduce((prevProduct, item) => item * prevProduct)
			handleSuccess(res, `mult result is ${result}`)
		}
	} else {
		res.writeHead(200, { "Content-Type": "text/plain" })
		res.end("Hello how are you?\n")
	}
})

server.listen(3000, "127.0.0.1", () => {
	console.log("Listening on 127.0.0.1:3000")
})
