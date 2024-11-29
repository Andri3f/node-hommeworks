import User from "./User.mjs"
import MongooseCRUDManager from "../MongooseCRUDManager.mjs"

class userDbService extends MongooseCRUDManager {}

export default new userDbService(User)
