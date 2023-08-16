import { Request, Response } from "express";
import { validationResult } from "express-validator";
import controller from "../controller";
import { ISection } from "../types";
import { ERRORS } from "../constants";

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
                    return res.json({ data: await controller.createProject({ ...data, user_id: id }) })

                case 'experience':
                    return res.json({ data: await controller.createExperience({ ...data, user_id: id }) })

                case 'education':
                    return res.json({ data: await controller.createEducation({ ...data, user_id: id }) })

                case 'header':
                    return res.json({ data: await controller.createHeader({ ...data, user_id: id }) })

                case 'award':
                    return res.json({ data: await controller.createAward({ ...data, user_id: id }) })

                default:
                    return;
            }

        }
        return res.json({ errors: results.array() })
    }

    update = async (req: Request, res: Response) => {
        const data = req.body
        const { id: paramId } = req.params;
        const results = validationResult(req)
        if (results.isEmpty()) {

            switch (this.section) {
                case 'project':
                    try {
                        return res.json({ data: await controller.updateProject(paramId, data) })
                    } catch (e) {
                        return res.json({ error: ERRORS.NotFound.message })
                    }

                case 'experience':
                    try {
                        return res.json({ data: await controller.updateExperience(paramId, data) })
                    } catch {
                        return res.json({ error: ERRORS.NotFound.message })
                    }

                case 'education':
                    try {
                        return res.json({ data: await controller.updateEducation(paramId, data) })
                    } catch {
                        return res.json({ error: ERRORS.NotFound.message })
                    }

                case 'header':
                    try {
                        return res.json({ data: await controller.updateHeader(paramId, data) })
                    } catch {
                        return res.json({ error: ERRORS.NotFound.message })
                    }

                case 'award':
                    try {
                        return res.json({ data: await controller.updateAward(paramId, data) })
                    } catch {
                        return res.json({ error: ERRORS.NotFound.message })
                    }

                default:
                    return;
            }

        }
        return res.json({ errors: results.array() })
    }

    delete = async (req: Request, res: Response) => {
        const { id: paramId } = req.params;
        const results = validationResult(req)
        if (results.isEmpty()) {

            switch (this.section) {
                case 'project':
                    try {
                        return res.json({ data: await controller.deleteProject(paramId) })
                    } catch {
                        return res.json({ error: ERRORS.NotFound.message })
                    }

                case 'experience':
                    try {
                        return res.json({ data: await controller.deleteExperience(paramId) })
                    } catch {
                        return res.json({ error: ERRORS.NotFound.message })
                    }
                case 'education':
                    try {
                        return res.json({ data: await controller.deleteEducation(paramId) })
                    } catch {
                        return res.json({ error: ERRORS.NotFound.message })
                    }
                case 'award':
                    try {
                        return res.json({ data: await controller.deleteAward(paramId) })
                    } catch {
                        return res.json({ error: ERRORS.NotFound.message })
                    }
                default:
                    return;
            }

        }
        return res.json({ errors: results.array() })
    }

}


export default Section;