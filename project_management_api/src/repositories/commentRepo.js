import { prisma } from "../prisma/config.js";

export async function getAll({ search, sortBy, order, offset, limit }) {
    const conditions = {};
    if (search) {
        conditions.OR = [
            { content: { contains: search, mode: 'insensitive' } },
        ];
    }
    const comments = await prisma.comment.findMany({
        where: conditions,
        orderBy: { [sortBy]: order },
        take: limit,
        skip: offset,
    });
    return comments;
}


export async function getById(id) {
    const comment = await prisma.comment.findUnique({ where: { id } });
    return comment;
}


export async function create(resourceData) {
    const newComment = await prisma.comment.create({ data: resourceData });
    return newComment;
}


export async function update(id, updatedData) {
    try {
        const updatedComment = await prisma.comment.update({
            where: { id },
            data: updatedData,
        });
        return updatedComment;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}
export async function remove(id) {
    try {
        const deletedComment = await prisma.comment.delete({
            where: { id },
        });
        return deletedComment;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}
