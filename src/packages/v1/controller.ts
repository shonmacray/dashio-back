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

    createProject = async (data: IProject): Promise<IProject> => {
        console.log(data);

        return await prisma.project.create({ data })
    }

    createExperience = async (data: IExperience): Promise<IExperience> => {
        return await prisma.experience.create({ data })
    }

    createEducation = async (data: IEducation): Promise<IEducation> => {
        return await prisma.education.create({ data })
    }

}

const controller = new Controller()

export default controller;