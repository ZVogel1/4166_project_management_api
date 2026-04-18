import bcrypt from 'bcrypt';
import 'dotenv/config';
import { prisma } from '../src/prisma/config.js';

try {
    const isDeploySeed = process.env.SEED_MODE === 'deploy';

    if (!isDeploySeed) {
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

        const existingUser = await prisma.user.findUnique({
            where: { email: userData.email },
        });

        const user = existingUser
            ? await prisma.user.update({
                where: { email: userData.email },
                data: {
                    password: hashedPassword,
                    role: userData.role || 'USER',
                },
            })
            : await prisma.user.create({
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

    const alphaExisting = await prisma.project.findFirst({
        where: { name: 'Admin Sample Project' },
    });

    const alphaProject = alphaExisting
        ? await prisma.project.update({
            where: { id: alphaExisting.id },
            data: {
                creatorId: adminUser.id,
                description: 'Sample project primarily associated with the admin user.',
            },
        })
        : await prisma.project.create({
            data: {
                creatorId: adminUser.id,
                name: 'Admin Sample Project',
                description: 'Sample project primarily associated with the admin user.',
            },
        });

    const betaExisting = await prisma.project.findFirst({
        where: { name: 'User Sample Project' },
    });

    const betaProject = betaExisting
        ? await prisma.project.update({
            where: { id: betaExisting.id },
            data: {
                creatorId: regularUser.id,
                description: 'Sample project primarily associated with the regular user.',
            },
        })
        : await prisma.project.create({
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
        skipDuplicates: true,
    });

    const adminTaskExisting = await prisma.task.findFirst({
        where: { description: 'Admin-created task assigned to the regular user.' },
    });

    const adminCreatedTask = adminTaskExisting
        ? await prisma.task.update({
            where: { id: adminTaskExisting.id },
            data: {
                projectId: alphaProject.id,
                creatorId: adminUser.id,
                assigneeId: regularUser.id,
                status: 'in_progress',
            },
        })
        : await prisma.task.create({
            data: {
                projectId: alphaProject.id,
                creatorId: adminUser.id,
                assigneeId: regularUser.id,
                description: 'Admin-created task assigned to the regular user.',
                status: 'in_progress',
            },
        });

    const userTaskExisting = await prisma.task.findFirst({
        where: { description: 'Regular-user-created task assigned to the admin user.' },
    });

    const userCreatedTask = userTaskExisting
        ? await prisma.task.update({
            where: { id: userTaskExisting.id },
            data: {
                projectId: betaProject.id,
                creatorId: regularUser.id,
                assigneeId: adminUser.id,
                status: 'todo',
            },
        })
        : await prisma.task.create({
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
        skipDuplicates: true,
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
