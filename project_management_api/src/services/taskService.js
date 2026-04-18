import {
    getAll,
    getById,
    create,
    update,
    remove,
} from '../repositories/taskRepo.js';

export async function getAllTasks(options) {
    return getAll(options);
}

export async function getTaskById(id) {
    const task = await getById(id);
    if (task) return task;
    else {
        const error = new Error(`Task ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function createTask(resourceData) {
    try {
        return await create(resourceData);
    } catch (error) {
        if (error.code === 'P2003') {
            const fieldName = error.meta?.field_name || '';
            const constraintName = error.meta?.constraint || '';

            const relationHint = `${fieldName} ${constraintName}`.toLowerCase();

            const clientError = new Error('Invalid related resource reference');
            clientError.status = 400;

            if (relationHint.includes('project')) {
                clientError.message = `Project ${resourceData.projectId} not found`;
            } else if (relationHint.includes('assignee')) {
                clientError.message = `Assignee ${resourceData.assigneeId} not found`;
            } else if (relationHint.includes('creator')) {
                clientError.message = `Creator ${resourceData.creatorId} not found`;
            }

            throw clientError;
        }

        throw error;
    }
}

export async function updateTask(id, updatedData) {
    const updatedTask = await update(id, updatedData);
    if (updatedTask) return updatedTask;
    else {
        const error = new Error(`Task ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function deleteTask(id) {
    const result = await remove(id);
    if (result) return;
    else {
        const error = new Error(`Task ${id} not found`);
        error.status = 404;
        throw error;
    }
}
