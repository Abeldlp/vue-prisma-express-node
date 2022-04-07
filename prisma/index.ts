import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const userOne = await prisma.user.findUnique({
    where: { id: 1 },
    include: {
      tasks: true,
    },
  });
  console.log(userOne);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
