import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import prismaClientPkg from '../generated/prisma/index.js';

const { PrismaClient } = prismaClientPkg;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error('DATABASE_URL is not set in .env');
}

const adapter = new PrismaPg({ connectionString: databaseUrl });

export const prisma = new PrismaClient({ adapter });
