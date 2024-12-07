import express from "express"
import connectionDd from "./db/connectionDd.mjs"
import routes from "./routes/index.mjs"
import middleware from "./middleware/index.mjs"
import errorHandler from "./middleware/errorHandler.mjs"

const app = express()

connectionDd()

middleware(app)

app.use("/", routes)

errorHandler(app)

const port = process.env.PORT || 3000 // Use Render's port or 3000 locally
app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})

export default app
