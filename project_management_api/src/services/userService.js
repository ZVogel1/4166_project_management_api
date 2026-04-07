import {
    getAll,
    getById,
    create,
    update,
    remove,
} from '../repositories/userRepo.js';

export async function getAllUsers(options) {
    return getAll(options);
}

export async function getUserById(id) {
    const user = await getById(id);
    if (user) return user;
    else {
        const error = new Error(`User ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function createUser(resourceData) {
    return create(resourceData);
}

export async function updateUser(id, updatedData) {
    const updatedUser = await update(id, updatedData);
    if (updatedUser) return updatedUser;
    else {
        const error = new Error(`User ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function deleteUser(id) {
    const result = await remove(id);
    if (result) return;
    else {
        const error = new Error(`User ${id} not found`);
        error.status = 404;
        throw error;
    }
}
