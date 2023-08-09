import express from "express"
import api from "./controllers"
import {
    CreateValidation,
    LoginValidation,
    SectionValidation
} from "./validator"
import { JWTMiddleware } from "../common/jwt"

const version1 = express.Router()

version1.get("/user", JWTMiddleware, api.getUser)
version1.post("/user/section", JWTMiddleware, SectionValidation, api.addSection)
// auth
version1.post("/user", CreateValidation, api.createUser)
version1.post("/login", LoginValidation, api.loginWithEmail)


export default version1