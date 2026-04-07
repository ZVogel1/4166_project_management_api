import {
    getAll,
    getById,
    create,
    update,
    remove,
} from '../repositories/projectRepo.js';

export async function getAllProjects(options) {
    return getAll(options);
}

export async function getProjectById(id) {
    const project = await getById(id);
    if (project) return project;
    else {
        const error = new Error(`Project ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function createProject(resourceData) {
    return create(resourceData);
}

export async function updateProject(id, updatedData) {
    const updatedProject = await update(id, updatedData);
    if (updatedProject) return updatedProject;
    else {
        const error = new Error(`Project ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function deleteProject(id) {
    const result = await remove(id);
    if (result) return;
    else {
        const error = new Error(`Project ${id} not found`);
        error.status = 404;
        throw error;
    }
}
