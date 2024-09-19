import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function (id: string) {
  return await prisma.account.findMany({
    where: {
      user: {
        id: id,
      },
    },
  });
}
