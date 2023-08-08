import { Request, Response } from "express";
import { validationResult } from "express-validator"
import service from "./service"
import Password from "../common/password";

class Api {

    getUser = async (_req: Request, res: Response) => {
        const user = await service.getUser({ email: "shonmacray@yahoo.com" })
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

                const newUser: any = await service.createUser(data)
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
            const user = await service.getUser({ email })
            if (!user) {
                return res.json({ error: "user not found" })
            }
            const pwd = new Password()
            const isTheSame = await pwd.compare(password, user.password)

            if (!isTheSame) {
                return res.json({ error: "username/password is wrong" })
            }

            return res.json({ sjje: "get user and token" })
        }
        return res.json({ errors: results.array() })
    }

}

const api = new Api()

export default api;