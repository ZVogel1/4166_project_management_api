import { prisma } from "../prisma/config.js";

export async function getAll({ search, sortBy, order, offset, limit }) {
    const conditions = {};
    if (search) {
        conditions.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
        ];
    }
    const projects = await prisma.project.findMany({
        where: conditions,
        orderBy: { [sortBy]: order },
        take: limit,
        skip: offset,
    });
    return projects;
}


export async function getById(id) {
    const project = await prisma.project.findUnique({ where: { id } });
    return project;
}


export async function create(resourceData) {
    const newProject = await prisma.project.create({ data: resourceData });
    return newProject;
}


export async function update(id, updatedData) {
    try {
        const updatedProject = await prisma.project.update({
            where: { id },
            data: updatedData,
        });
        return updatedProject;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}
export async function remove(id) {
    try {
        const deletedProject = await prisma.project.delete({
            where: { id },
        });
        return deletedProject;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}