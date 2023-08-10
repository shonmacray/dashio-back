import { Request, Response } from "express";
import { validationResult } from "express-validator"
import service from "./service"
import Password from "../common/password";
import JWT from "../common/jwt";

class Api {

    getUser = async (_req: Request, res: Response) => {
        // get user from middleware
        const { id } = res.locals.user;

        const user: any = await service.getUser({ id })
        if (user) {
            delete user.password
        }
        return res.json(user)
    }

    createUser = async (req: Request, res: Response): Promise<Response> => {
        const data = req.body
        const results = validationResult(req)
        if (results.isEmpty()) {
            const user = await service.getUser({ email: data.email })
            if (!user) {
                // hash password
                const password = new Password()
                data.password = await password.hash(data.password)

                const newUser: any = await service.createUser({ ...data, sections: ["HEADER", "SKILLS"] })
                delete newUser.password

                return res.json(newUser)
            }
            return res.json({ errors: "user exists" })
        }
        return res.json({ errors: results.array() })

    }

    loginWithEmail = async (req: Request, res: Response): Promise<Response> => {
        const results = validationResult(req)
        if (results.isEmpty()) {
            const { password, email } = req.body
            const user: any = await service.getUser({ email })
            if (!user) {
                return res.json({ error: "user not found" })
            }
            const pwd = new Password()
            const isTheSame = await pwd.compare(password, user.password)

            if (!isTheSame) {
                return res.json({ error: "username/password is wrong" })
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
                const section = await service.getUser({ id, sections: { has: name } })
                if (!section) {
                    const user = await service.updateUser({ id }, { sections: { push: name } })
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
                const section = await service.getUser({ id, sections: { has: name } })
                if (section) {
                    const sections = [...section.sections]

                    const index = sections.findIndex((section) => section === name)
                    sections.splice(index, 1)

                    const user = await service.updateUser({ id }, { sections })
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