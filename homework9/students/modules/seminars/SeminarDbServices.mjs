import Seminar from "./Seminar.mjs"
import MongooseCRUDManager from "../MongooseCRUDManager.mjs"

class SeminarDbServices extends MongooseCRUDManager {}

export default new SeminarDbServices(Seminar)
