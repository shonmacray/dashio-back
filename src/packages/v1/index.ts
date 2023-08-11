import express from "express"
import { JWTMiddleware } from "../common/jwt"
import VALIDATION from "./validator"
import header from "./services/header.service"
import api from "./services/service"

const version1 = express.Router()

version1.get("/user", JWTMiddleware, api.getUser)
version1.post("/user/section", JWTMiddleware, VALIDATION.Section, api.addSection)
version1.delete("/user/section", JWTMiddleware, VALIDATION.Section, api.removeSection)
version1.post("/user/skill", JWTMiddleware, VALIDATION.Skill, api.addSkill)
version1.delete("/user/skill", JWTMiddleware, VALIDATION.Skill, api.removeSkill)
// header
version1.post("/user/header", JWTMiddleware, VALIDATION.header, header.createHeader)
// auth
version1.post("/user", VALIDATION.CreateUser, api.createUser)
version1.post("/login", VALIDATION.Login, api.loginWithEmail)


export default version1