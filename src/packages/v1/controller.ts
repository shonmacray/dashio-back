import { PrismaClient } from "@prisma/client";
import { IHeader } from "./types";

const prisma = new PrismaClient()

class Controller {
    getUser = async (where: any) => await prisma.user.findUnique({
        where: where, include: {
            header: true
        }
    })

    createUser = async (data: any) => await prisma.user.create({ data })

    updateUser = async (where: any, data: any) => await prisma.user.update({ where, data })

    createHeader = async (data: IHeader): Promise<IHeader> => {
        return await prisma.header.create({ data })
    }
}

const controller = new Controller()

export default controller;