import bcrypt from 'bcrypt';
import 'dotenv/config';
import { prisma } from '../src/prisma/config.js';

try {
    const isDeploySeed = process.env.SEED_MODE === 'deploy';

    if (isDeploySeed) {
        const existingUsers = await prisma.user.count();
        if (existingUsers > 0) {
            console.log('Seed skipped: data already exists.');
            process.exit(0);
        }
    } else {
        await prisma.$executeRawUnsafe(
            'TRUNCATE TABLE comments, tasks, project_members, projects, users RESTART IDENTITY CASCADE;'
        );
    }

    const usersData = [
        { email: 'user6@test.com', password: 'password6', role: 'ADMIN' },
        { email: 'user5@test.com', password: 'password5', role: 'USER' },
    ];

    const users = [];

    for (const userData of usersData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const user = await prisma.user.create({
            data: {
                email: userData.email,
                password: hashedPassword,
                role: userData.role || 'USER',
            },
        });

        users.push(user);
    }

    const adminUser = users.find((user) => user.role.toUpperCase() === 'ADMIN');
    const regularUser = users.find((user) => user.role.toUpperCase() === 'USER');

    const alphaProject = await prisma.project.create({
        data: {
            creatorId: adminUser.id,
            name: 'Admin Sample Project',
            description: 'Sample project primarily associated with the admin user.',
        },
    });

    const betaProject = await prisma.project.create({
        data: {
            creatorId: regularUser.id,
            name: 'User Sample Project',
            description: 'Sample project primarily associated with the regular user.',
        },
    });

    await prisma.projectMember.createMany({
        data: [
            { userId: adminUser.id, projectId: alphaProject.id },
            { userId: regularUser.id, projectId: alphaProject.id },
            { userId: regularUser.id, projectId: betaProject.id },
        ],
    });

    const adminCreatedTask = await prisma.task.create({
        data: {
            projectId: alphaProject.id,
            creatorId: adminUser.id,
            assigneeId: regularUser.id,
            description: 'Admin-created task assigned to the regular user.',
            status: 'in_progress',
        },
    });

    const userCreatedTask = await prisma.task.create({
        data: {
            projectId: betaProject.id,
            creatorId: regularUser.id,
            assigneeId: adminUser.id,
            description: 'Regular-user-created task assigned to the admin user.',
            status: 'todo',
        },
    });

    await prisma.comment.createMany({
        data: [
            {
                taskId: adminCreatedTask.id,
                authorId: regularUser.id,
                content: 'Regular user comment on admin-owned task.',
            },
            {
                taskId: userCreatedTask.id,
                authorId: adminUser.id,
                content: 'Admin comment on regular user task.',
            },
        ],
    });

    console.log('Seed completed successfully!');
    console.log('Users seeded:');
    console.log(' - user6@test.com / password6 (ADMIN)');
    console.log(' - user5@test.com / password5 (USER)');
} catch (error) {
    console.error('Seed failed:', error);
} finally {
    await prisma.$disconnect();
}
