import express from "express"
import api from "./controllers"
import { CreateValidation } from "./validator"

const version1 = express.Router()

version1.get("/user", api.getUser)
version1.post("/user", CreateValidation, api.createUser)

export default version1