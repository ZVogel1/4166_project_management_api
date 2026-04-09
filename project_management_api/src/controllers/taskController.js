import {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
} from '../services/taskService.js';

export async function getAllTasksHandler(req, res) {
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
    let tasks = await getAllTasks(options);
    res.status(200).json(tasks);
}

export async function getTaskByIdHandler(req, res) {
    const id = parseInt(req.params.id);
    const task = await getTaskById(id);
    res.status(200).json(task);
}

export async function createTaskHandler(req, res) {
    const { projectId, assigneeId, description, status } = req.body;

    const newTask = await createTask({
        projectId,
        assigneeId,
        description,
        status,
        creatorId: req.user.id,
    });

    res.status(201).json(newTask);
}

export async function updateTaskHandler(req, res) {
    const id = parseInt(req.params.id);
    const { description, status, assigneeId } = req.body;
    const updatedTask = await updateTask(id, { description, status, assigneeId });
    res.status(200).json(updatedTask);
}

export async function deleteTaskHandler(req, res) {
    const id = parseInt(req.params.id);
    await deleteTask(id);
    res.status(204).send();
}
