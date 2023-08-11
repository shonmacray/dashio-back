import { Request, Response } from "express";
import { validationResult } from "express-validator"

import { IHeader } from "../types";
import controller from "../controller";

class Header {

    createHeader = async (req: Request, res: Response): Promise<Response> => {
        const results = validationResult(req)
        if (results.isEmpty()) {
            const { id } = res.locals.user
            const data: IHeader = req.body

            const header = await controller.createHeader({ ...data, user_id: id })
            return res.json({ data: header })

        }
        return res.json({ error: results.array() })
    }
}


const header = new Header()


export default header;
