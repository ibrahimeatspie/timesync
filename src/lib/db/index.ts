import { PrismaClient, type Prisma } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}
const prismaOptions: Prisma.PrismaClientOptions = {
  log: ["error", "warn"],
  errorFormat: "minimal",
};

export const prisma = globalThis.prisma || new PrismaClient(prismaOptions);

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;
