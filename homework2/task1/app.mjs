import readline from "readline"
const argString = process.argv.slice(2).join("&")
const argObj = new URLSearchParams(argString)
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})
const pensionAge = parseInt(argObj.get("–-pension"))
if (pensionAge) {
	rl.question("how ald are you? ", (age) => {
		console.log(parseInt(age) >= pensionAge ? "you are retired" : "you are Not retired")
		rl.close()
	})
} else {
	console.log("Pleas provide a pension age (--pension=<value>)")
	rl.close()
}
