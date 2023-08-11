import { Request, Response } from "express";
import { validationResult } from "express-validator"
import controller from "../controller"
import Password from "../../common/password";
import JWT from "../../common/jwt";
import { ERRORS } from "../constants";


class Api {

    getUser = async (_req: Request, res: Response) => {
        // get user from middleware
        const { id } = res.locals.user;

        const user: any = await controller.getUser({ id })
        if (user) {
            delete user.password
        }
        return res.json(user)
    }

    createUser = async (req: Request, res: Response): Promise<Response> => {
        const data = req.body
        const results = validationResult(req)
        if (results.isEmpty()) {
            const user = await controller.getUser({ email: data.email })
            if (!user) {
                // hash password
                const password = new Password()
                data.password = await password.hash(data.password)

                const newUser: any = await controller.createUser({ ...data, sections: ["HEADER", "SKILLS"] })
                delete newUser.password

                return res.json(newUser)
            }
            return res.json({ errors: ERRORS.Taken.message })
        }
        return res.json({ errors: results.array() })

    }

    loginWithEmail = async (req: Request, res: Response): Promise<Response> => {
        const results = validationResult(req)
        if (results.isEmpty()) {
            const { password, email } = req.body
            const user: any = await controller.getUser({ email })
            if (!user) {
                return res.json({ error: ERRORS.NotFound.message })
            }
            const pwd = new Password()
            const isTheSame = await pwd.compare(password, user.password)

            if (!isTheSame) {
                return res.json({ error: ERRORS.Forbidden.message })
            }
            const jwt = new JWT()
            const token = await jwt.sign(user.id, user.email)

            delete user.password
            return res.json({ token, user })
        }
        return res.json({ errors: results.array() })
    }

    addSection = async (req: Request, res: Response): Promise<Response> => {
        const results = validationResult(req)
        if (results.isEmpty()) {
            const { id } = res.locals.user
            const { name } = req.body
            try {
                const section = await controller.getUser({ id, sections: { has: name } })
                if (!section) {
                    const user = await controller.updateUser({ id }, { sections: { push: name } })
                    if (user) {
                        return res.json({ success: true })
                    }
                } else {
                    return res.json({ success: false })
                }

            } catch (error) {
                return res.json({ success: false })
            }

        }
        return res.json({ error: results.array() })
    }
    removeSection = async (req: Request, res: Response): Promise<Response> => {
        const results = validationResult(req)
        if (results.isEmpty()) {
            const { id } = res.locals.user
            const { name } = req.body
            try {
                const section = await controller.getUser({ id, sections: { has: name } })
                if (section) {
                    const sections = [...section.sections]

                    const index = sections.findIndex((section) => section === name)
                    sections.splice(index, 1)

                    const user = await controller.updateUser({ id }, { sections })
                    if (user) {
                        return res.json({ success: true })
                    }
                } else {
                    return res.json({ success: false })
                }

            } catch (error) {
                return res.json({ success: false })
            }

        }
        return res.json({ error: results.array() })
    }

    addSkill = async (req: Request, res: Response): Promise<Response> => {
        const results = validationResult(req)
        if (results.isEmpty()) {
            const { id } = res.locals.user
            const { skill } = req.body
            try {
                const userSkill = await controller.getUser({ id, skills: { has: skill } })
                if (!userSkill) {
                    const user = await controller.updateUser({ id }, { skills: { push: skill } })
                    if (user) {
                        return res.json({ success: true })
                    }
                } else {
                    return res.json({ success: false })
                }

            } catch (error) {
                return res.json({ success: false })
            }

        }
        return res.json({ error: results.array() })
    }
    removeSkill = async (req: Request, res: Response): Promise<Response> => {
        const results = validationResult(req)
        if (results.isEmpty()) {
            const { id } = res.locals.user
            const { skill } = req.body
            try {
                const userSkill = await controller.getUser({ id, skills: { has: skill } })
                if (userSkill) {
                    const skills = [...userSkill.skills]

                    const index = skills.findIndex((ski) => ski === skill)
                    skills.splice(index, 1)

                    const user = await controller.updateUser({ id }, { skills })
                    if (user) {
                        return res.json({ success: true })
                    }
                } else {
                    return res.json({ success: false })
                }

            } catch (error) {
                return res.json({ success: false })
            }

        }
        return res.json({ error: results.array() })
    }
}

const api = new Api()

export default api;