import bcrypt from 'bcrypt';
import { prisma } from '../src/prisma/config.js';

const SAMPLE_PROJECT_NAMES = ['Seed Project Alpha', 'Seed Project Beta'];

async function upsertKnownUsers() {
    const user6PasswordHash = await bcrypt.hash('password6', 10);
    const user5PasswordHash = await bcrypt.hash('password5', 10);

    const adminUser = await prisma.user.upsert({
        where: { email: 'user6@test.com' },
        update: {
            password: user6PasswordHash,
            role: 'ADMIN',
        },
        create: {
            email: 'user6@test.com',
            password: user6PasswordHash,
            role: 'ADMIN',
        },
        select: {
            id: true,
            email: true,
            role: true,
        },
    });

    const regularUser = await prisma.user.upsert({
        where: { email: 'user5@test.com' },
        update: {
            password: user5PasswordHash,
            role: 'USER',
        },
        create: {
            email: 'user5@test.com',
            password: user5PasswordHash,
            role: 'USER',
        },
        select: {
            id: true,
            email: true,
            role: true,
        },
    });

    return { adminUser, regularUser };
}

async function resetSampleResources() {
    const sampleProjects = await prisma.project.findMany({
        where: {
            name: {
                in: SAMPLE_PROJECT_NAMES,
            },
        },
        select: {
            id: true,
        },
    });

    const sampleProjectIds = sampleProjects.map((project) => project.id);

    if (sampleProjectIds.length > 0) {
        await prisma.comment.deleteMany({
            where: {
                task: {
                    projectId: {
                        in: sampleProjectIds,
                    },
                },
            },
        });

        await prisma.task.deleteMany({
            where: {
                projectId: {
                    in: sampleProjectIds,
                },
            },
        });

        await prisma.projectMember.deleteMany({
            where: {
                projectId: {
                    in: sampleProjectIds,
                },
            },
        });

        await prisma.project.deleteMany({
            where: {
                id: {
                    in: sampleProjectIds,
                },
            },
        });
    }
}

async function createSampleResources({ adminUser, regularUser }) {
    const alphaProject = await prisma.project.create({
        data: {
            name: 'Seed Project Alpha',
            description: 'Seeded sample project owned by seeded users for auth testing.',
        },
    });

    const betaProject = await prisma.project.create({
        data: {
            name: 'Seed Project Beta',
            description: 'Second seeded project for ownership and role checks.',
        },
    });

    await prisma.projectMember.createMany({
        data: [
            { userId: adminUser.id, projectId: alphaProject.id },
            { userId: regularUser.id, projectId: alphaProject.id },
            { userId: adminUser.id, projectId: betaProject.id },
        ],
    });

    const adminCreatedTask = await prisma.task.create({
        data: {
            projectId: alphaProject.id,
            creatorId: adminUser.id,
            assigneeId: regularUser.id,
            description: 'Admin-created task assigned to regular user.',
            status: 'in_progress',
        },
    });

    const regularCreatedTask = await prisma.task.create({
        data: {
            projectId: betaProject.id,
            creatorId: regularUser.id,
            assigneeId: adminUser.id,
            description: 'Regular-user-created task assigned to admin.',
            status: 'todo',
        },
    });

    await prisma.comment.createMany({
        data: [
            {
                taskId: adminCreatedTask.id,
                authorId: regularUser.id,
                content: 'Regular user comment on admin-created task.',
            },
            {
                taskId: regularCreatedTask.id,
                authorId: adminUser.id,
                content: 'Admin comment on regular-user-created task.',
            },
        ],
    });

    return {
        projectsCreated: 2,
        tasksCreated: 2,
        commentsCreated: 2,
    };
}

async function main() {
    const users = await upsertKnownUsers();
    await resetSampleResources();
    const resourceCounts = await createSampleResources(users);
}

main()
    .catch((error) => {
        console.error('Seed failed:', error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
