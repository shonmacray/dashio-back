import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

class Service {
    getUser = async (data: any) => {
        return await prisma.user.findUnique({ where: { email: data.email } })
    }

    createUser = async (data: any) => {
        return await prisma.user.create({ data })
    }
}

const service = new Service()

export default service;