// import { PrismaClient } from '@prisma/client';

// // https://authjs.dev/getting-started/adapters/prisma
// declare global {
//   var prisma: PrismaClient | undefined;
// }

// const client = globalThis.prisma || new PrismaClient();
// if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

// export default client;

// import { PrismaClient } from '@prisma/client';
import { PrismaClient } from '@/lib/generated/prisma';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const client = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = client;

export default client;
