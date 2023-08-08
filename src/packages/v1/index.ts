import express from "express"
import api from "./controllers"
import { CreateValidation, LoginValidation } from "./validator"

const version1 = express.Router()

version1.get("/user", api.getUser)
version1.post("/user", CreateValidation, api.createUser)
version1.post("/login", LoginValidation, api.loginWithEmail)

export default version1