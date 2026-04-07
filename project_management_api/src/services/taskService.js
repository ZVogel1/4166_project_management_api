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
    return create(resourceData);
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
