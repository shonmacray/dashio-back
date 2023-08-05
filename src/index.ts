import express, { Request, Response } from "express"
import dotenv from "dotenv"
import version1 from "./packages/v1"

dotenv.config()


const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use("/api/v1/", version1)

app.get("/", (_req: Request, res: Response) => {
    res.send("root route")
})

app.listen(port, () => console.log(`server started on http://localhost:${port}`))