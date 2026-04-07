import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from '../services/userService.js';

// ...existing code...
export async function getAllUsersHandler(req, res) {
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
        offset: parseInt(offset, 10),
        limit: parseInt(limit, 10),
    };

    const users = await getAllUsers(options);
    res.status(200).json(users);
}

export async function getUserByIdHandler(req, res) {
    const id = parseInt(req.params.id, 10);
    const user = await getUserById(id);
    res.status(200).json(user);
}

export async function createUserHandler(req, res) {
    const { email, password, role } = req.body;
    const newUser = await createUser({ email, password, role });
    res.status(201).json(newUser);
}

export async function updateUserHandler(req, res) {
    const id = parseInt(req.params.id, 10);
    const { email, password, role } = req.body;
    const updatedUser = await updateUser(id, { email, password, role });
    res.status(200).json(updatedUser);
}


export async function deleteUserHandler(req, res) {
    const id = parseInt(req.params.id);
    await deleteUser(id);
    res.status(204).send();
}
