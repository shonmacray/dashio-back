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
            return res.json(data)

            // const data = await service.createUser(user)
        }
        return res.json({ errors: results.array() })

    }

}

const api = new Api()

export default api;