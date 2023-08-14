import express from "express"
import { JWTMiddleware } from "../common/jwt"
import VALIDATION from "./validator"
import header from "./services/header.service"
import api from "./services/service"
import Section from "./services/sections.service"

const version1 = express.Router()

const project = new Section("project")
const experience = new Section("experience")
const education = new Section("education")

version1.get("/user", JWTMiddleware, api.getUser)
version1.post("/user/section", JWTMiddleware, VALIDATION.Section, api.addSection)
version1.delete("/user/section", JWTMiddleware, VALIDATION.Section, api.removeSection)
version1.post("/user/skill", JWTMiddleware, VALIDATION.Skill, api.addSkill)
version1.delete("/user/skill", JWTMiddleware, VALIDATION.Skill, api.removeSkill)
// header
version1.post("/user/header", JWTMiddleware, VALIDATION.header, header.createHeader)
// sections

version1.post("/user/project", JWTMiddleware, VALIDATION.project, project.create)
version1.post("/user/experience", JWTMiddleware, VALIDATION.experience, experience.create)
version1.post("/user/education", JWTMiddleware, VALIDATION.education, education.create)
// auth
version1.post("/user", VALIDATION.CreateUser, api.createUser)
version1.post("/login", VALIDATION.Login, api.loginWithEmail)


export default version1