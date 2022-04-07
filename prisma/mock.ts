import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: 'Roger',
      email: 'childhood331@gmail.com',
    },
  });

  await prisma.task.create({
    data: {
      userId: 2,
      content: 'wake up Leo',
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
