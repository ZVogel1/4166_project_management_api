import {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
} from '../services/projectService.js';

export async function getAllProjectsHandler(req, res) {
    const {
        search = '',
        sortBy = 'id',
        order = 'asc',
        offset = 0,
        limit = 5,
    } = req.query;

    const options = {
        search,
        sortBy,
        order,
        offset: parseInt(offset),
        limit: parseInt(limit),
    };
    let projects = await getAllProjects(options);
    res.status(200).json(projects);
}

export async function getProjectByIdHandler(req, res) {
    const id = parseInt(req.params.id);
    const project = await getProjectById(id);
    res.status(200).json(project);
}

export async function createProjectHandler(req, res) {
    const { name, description } = req.body;
    const newProject = await createProject({
        name,
        description,
        creatorId: req.user.id,
    });
    res.status(201).json(newProject);
}

export async function updateProjectHandler(req, res) {
    const id = parseInt(req.params.id);
    const { name, description } = req.body;
    const updatedProject = await updateProject(id, { name, description }, req.user.id);
    res.status(200).json(updatedProject);
}

export async function deleteProjectHandler(req, res) {
    const id = parseInt(req.params.id);
    await deleteProject(id, req.user.id);
    res.status(204).send();
}
