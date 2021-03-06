import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Xiangyi',
      email: 'childhood331@gmail.com',
    },
  });

  const task = await prisma.task.create({
    data: {
      userId: 2,
      content: 'wake up Leo',
    },
  });

  console.log(user);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
