import dotenv from "dotenv"
dotenv.config()

export default Object.freeze({
	databaseName: process.env.DATABASE_NAME,
	databaseUrl: process.env.MONGODB_URL,
	secretKey: process.env.SESSION_SECRET_KEY,
	mongoURI: `${process.env.MONGODB_URL}${process.env.DATABASE_NAME}`,
	port: process.env.PORT,
})
