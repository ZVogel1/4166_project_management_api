import {
    getAll,
    getById,
    create,
    update,
    remove,
} from '../repositories/commentRepo.js';

export async function getAllComments(options) {
    return getAll(options);
}

export async function getCommentById(id) {
    const comment = await getById(id);
    if (comment) return comment;
    else {
        const error = new Error(`Comment ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function createComment(resourceData) {
    try {
        return await create(resourceData);
    } catch (error) {
        if (error.code === 'P2003') {
            const fieldName = error.meta?.field_name || '';
            const constraintName = error.meta?.constraint || '';
            const relationHint = `${fieldName} ${constraintName}`.toLowerCase();

            const clientError = new Error('Invalid related resource reference');
            clientError.status = 400;

            if (relationHint.includes('task')) {
                clientError.message = `Task ${resourceData.taskId} not found`;
            } else if (relationHint.includes('author')) {
                clientError.message = `Author ${resourceData.authorId} not found`;
            }

            throw clientError;
        }

        throw error;
    }
}

export async function updateComment(id, updatedData) {
    const updatedComment = await update(id, updatedData);
    if (updatedComment) return updatedComment;
    else {
        const error = new Error(`Comment ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function deleteComment(id) {
    const result = await remove(id);
    if (result) return;
    else {
        const error = new Error(`Comment ${id} not found`);
        error.status = 404;
        throw error;
    }
}
