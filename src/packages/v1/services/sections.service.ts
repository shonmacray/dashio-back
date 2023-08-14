import { Request, Response } from "express";
import { validationResult } from "express-validator";
import controller from "../controller";
import { ISection } from "../types";

class Section {
    protected section: string = "";

    constructor(section: ISection) {
        this.section = section

    }
    create = async (req: Request, res: Response) => {
        const data = req.body
        const { id } = res.locals.user;
        const results = validationResult(req)
        if (results.isEmpty()) {

            switch (this.section) {
                case 'project':
                    console.log(id);

                    return res.json({ data: await controller.createProject({ ...data, user_id: id }) })

                case 'experience':
                    return res.json({ data: await controller.createExperience({ ...data, user_id: id }) })

                case 'education':
                    return res.json({ data: await controller.createEducation({ ...data, user_id: id }) })

                default:
                    return;
            }

        }
        return res.json({ errors: results.array() })
    }

}


export default Section;