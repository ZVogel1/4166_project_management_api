import { prisma } from "../prisma/config.js";

export async function getAll({ search, sortBy, order, offset, limit }) {
    const conditions = {};
    if (search) {
        conditions.OR = [
            { email: { contains: search, mode: 'insensitive' } },
        ];
    }
    const users = await prisma.user.findMany({
        where: conditions,
        orderBy: { [sortBy]: order },
        take: limit,
        skip: offset,
    });
    return users;
}


export async function getById(id) {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
}

export async function findUserByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
}


export async function create(resourceData) {
    const newUser = await prisma.user.create({ data: resourceData });
    return newUser;
}


export async function update(id, updatedData) {
    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: updatedData,
        });
        return updatedUser;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}
export async function remove(id) {
    try {
        const deletedUser = await prisma.user.delete({
            where: { id },
        });
        return deletedUser;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}