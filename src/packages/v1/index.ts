import express from "express"
import { JWTMiddleware } from "../common/jwt"
import VALIDATION from "./validator"
import api from "./services/service"
import Section from "./services/sections.service"
import User from "./services/user.service"

const version1 = express.Router()

const project = new Section("project")
const experience = new Section("experience")
const education = new Section("education")
const header = new Section("header")
const award = new Section("award")

const language = new User("languages")
const section = new User("sections")
const skill = new User("skills")

// user
version1.get("/user", JWTMiddleware, api.getUser)
version1.post("/user/languages", JWTMiddleware, VALIDATION.language, language.add)
version1.delete("/user/languages", JWTMiddleware, VALIDATION.language, language.remove)
version1.post("/user/section", JWTMiddleware, VALIDATION.Section, section.add)
version1.delete("/user/section", JWTMiddleware, VALIDATION.Section, section.remove)
version1.post("/user/skill", JWTMiddleware, VALIDATION.Skill, skill.add)
version1.delete("/user/skill", JWTMiddleware, VALIDATION.Skill, skill.remove)

// sections
version1.post("/user/header", JWTMiddleware, VALIDATION.header, header.create)
version1.put("/user/header/:id", JWTMiddleware, [...VALIDATION.header, VALIDATION.id], header.update)
version1.post("/user/project", JWTMiddleware, VALIDATION.project, project.create)
version1.put("/user/project/:id", JWTMiddleware, [...VALIDATION.project, VALIDATION.id], project.update)
version1.delete("/user/project/:id", JWTMiddleware, VALIDATION.id, project.delete)
version1.post("/user/experience", JWTMiddleware, VALIDATION.experience, experience.create)
version1.put("/user/experience/:id", JWTMiddleware, [...VALIDATION.experience, VALIDATION.id], experience.update)
version1.delete("/user/experience/:id", JWTMiddleware, VALIDATION.id, experience.delete)
version1.post("/user/education", JWTMiddleware, VALIDATION.education, education.create)
version1.put("/user/education/:id", JWTMiddleware, [...VALIDATION.education, VALIDATION.id], education.update)
version1.delete("/user/education/:id", JWTMiddleware, VALIDATION.id, education.delete)
version1.post("/user/award", JWTMiddleware, VALIDATION.award, award.create)
version1.put("/user/award/:id", JWTMiddleware, [...VALIDATION.award, VALIDATION.id], award.update)
version1.delete("/user/award/:id", JWTMiddleware, VALIDATION.id, award.delete)

// auth
version1.post("/user", VALIDATION.CreateUser, api.createUser)
version1.post("/login", VALIDATION.Login, api.loginWithEmail)


export default version1


// handle expired tokens