
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

interface IError {
    error: string;
}
interface IDecode {
    error: string;
}

class JWT {
    /** 
     * Handles jwtoken 
     */
    private secret: string = 'anybosswo'

    sign = async (id: string, email: string): Promise<string> => jwt.sign({ id, email }, this.secret)

    verify = async (token: string): Promise<IDecode | IError | null> => {
        try {
            const decode: any = jwt.verify(token, this.secret)
            if (decode) {
                return decode
            }
        } catch (error) {
            return { error: "invalid token" }
        }

        return null
    }
}

export const JWTMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers
    const token = authorization?.split(" ")[1] || ""
    const jwt = new JWT()

    const payload = await jwt.verify(token)
    if (payload?.error) {
        res.json(payload)
    } else {
        res.locals.user = payload
        next()
    }

}

// create jwt middleware here

export default JWT;
