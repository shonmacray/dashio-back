import { PrismaClient } from "@prisma/client";
import { IEducation, IExperience, IHeader, IProject } from "./types";

const prisma = new PrismaClient()

class Controller {
    getUser = async (where: any) => await prisma.user.findUnique({
        where: where, include: {
            header: true,
            projects: true,
            education: true,
            experiences: true
        }
    })

    createUser = async (data: any) => await prisma.user.create({ data })

    updateUser = async (where: any, data: any) => await prisma.user.update({ where, data })

    createHeader = async (data: IHeader): Promise<IHeader> => {
        return await prisma.header.create({ data })
    }
    // edit header

    // project

    createProject = async (data: IProject): Promise<IProject> => await prisma.project.create({ data })
    updateProject = async (id: string, data: IProject): Promise<IProject> => await prisma.project.update({ where: { id }, data })
    deleteProject = async (id: string): Promise<any> => await prisma.project.delete({ where: { id } })

    // experience

    createExperience = async (data: IExperience): Promise<IExperience> => await prisma.experience.create({ data })
    updateExperience = async (id: string, data: IExperience): Promise<IExperience> => await prisma.experience.update({ where: { id }, data })
    deleteExperience = async (id: string): Promise<IExperience> => await prisma.experience.delete({ where: { id } })

    // education

    createEducation = async (data: IEducation): Promise<IEducation> => await prisma.education.create({ data })
    updateEducation = async (id: string, data: IEducation): Promise<IEducation> => await prisma.education.update({ where: { id }, data })
    deleteEducation = async (id: string): Promise<IEducation> => await prisma.education.delete({ where: { id } })


}

const controller = new Controller()

export default controller;