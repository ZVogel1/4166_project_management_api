import { prisma } from "../prisma/config.js";

export async function getAll({ search, sortBy, order, offset, limit }) {
    const conditions = {};
    if (search) {
        conditions.OR = [
            { description: { contains: search, mode: 'insensitive' } },
        ];
    }
    const tasks = await prisma.task.findMany({
        where: conditions,
        orderBy: { [sortBy]: order },
        take: limit,
        skip: offset,
    });
    return tasks;
}


export async function getById(id) {
    const task = await prisma.task.findUnique({ where: { id } });
    return task;
}


export async function create(resourceData) {
    const newTask = await prisma.task.create({ data: resourceData });
    return newTask;
}


export async function update(id, updatedData) {
    try {
        const updatedTask = await prisma.task.update({
            where: { id },
            data: updatedData,
        });
        return updatedTask;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}
export async function remove(id) {
    try {
        const deletedTask = await prisma.task.delete({
            where: { id },
        });
        return deletedTask;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}