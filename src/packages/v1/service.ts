import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

class Service {
    getUser = async (where: any) => {
        return await prisma.user.findUnique({ where: where })
    }

    createUser = async (data: any) => {
        return await prisma.user.create({ data })
    }
}

const service = new Service()

export default service;