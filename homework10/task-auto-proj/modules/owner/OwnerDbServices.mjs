import Owner from "./Owner.mjs"
import MongooseCRUDManager from "../MongooseCRUDManager.mjs"

class OwnerDbServices extends MongooseCRUDManager {}

export default new OwnerDbServices(Owner)
