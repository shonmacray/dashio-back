import { Request, Response } from "express"
import { IUserParts } from "../types"
import { validationResult } from "express-validator"
import controller from "../controller"

class User {
    private part: string = ""

    constructor(part: IUserParts) {
        this.part = part
    }

    add = async (req: Request, res: Response): Promise<Response> => {
        const results = validationResult(req)
        if (results.isEmpty()) {
            // must consist only one key
            const key = Object.keys(req.body)[0]
            const value = req.body[key]
            const { id } = res.locals.user

            try {
                const part = await controller.getUser({ id, [this.part]: { has: value } })
                if (!part) {
                    const update = await controller.updateUser({ id }, { [this.part]: { push: value } })
                    if (update) {
                        return res.json({ success: true })
                    }
                } else {
                    return res.json({ success: false })

                }

            } catch {
                return res.json({ success: false })
            }

        }
        return res.json({ error: results.array() })
    }
    remove = async (req: Request, res: Response): Promise<Response> => {
        const results = validationResult(req)
        if (results.isEmpty()) {
            // must consist only one key
            const key = Object.keys(req.body)[0]
            const value = req.body[key]
            const { id } = res.locals.user
            try {
                const part: any = await controller.getUser({ id, [this.part]: { has: value } })
                if (part) {

                    const newPart = [...part[this.part]]

                    const index = newPart.findIndex((part) => part === value)
                    newPart.splice(index, 1)

                    const update = await controller.updateUser({ id }, { [this.part]: newPart })
                    if (update) {
                        return res.json({ success: true })
                    }
                } else {
                    return res.json({ success: false })

                }

            } catch (e) {
                console.log(e);

                return res.json({ success: false })
            }

        }
        return res.json({ error: results.array() })
    }
}

export default User;