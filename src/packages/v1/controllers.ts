import { Request, Response } from "express";
import { validationResult } from "express-validator"
import service from "./service"

class Api {

    getUser = async (_req: Request, res: Response) => {
        const user = await service.getUser({ email: "shon@yahoo.com" })
        return res.json(user)
    }

    createUser = async (req: Request, res: Response) => {
        const data = req.body
        const results = validationResult(req)
        if (results.isEmpty()) {
            const user = await service.getUser(data)
            if (!user) {
                const newUser = await service.createUser(data)
                return res.json(newUser)
            }
            return res.json({ errors: "user exists" })
        }
        return res.json({ errors: results.array() })

    }

}

const api = new Api()

export default api;