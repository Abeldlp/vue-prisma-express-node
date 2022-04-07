import { Express, Request, Response } from 'express';
import * as express from 'express';
import * as cors from 'cors';
import {} from 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const app: Express = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 4444;
const prisma = new PrismaClient();

app.get('/', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: {
      tasks: true,
    },
  });

  res.json(users);
});

app.get('/user/:id', async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) },
    include: {
      tasks: true,
    },
  });

  user ? res.json(user) : res.send('No user found with id ' + req.params.id);
});

app.post('/user/', async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
    },
  });

  res.json(user);
});

app.delete('/user/:id', async (req: Request, res: Response) => {
  // const deleteTask = prisma.task.deleteMany({
  //   where: { userId: parseInt(req.params.id) },
  // });

  // const deletePost = prisma.post.deleteMany({
  //   where: { authorId: parseInt(req.params.id) },
  // });

  // const deleteProfile = prisma.profile.delete({
  //   where: { userId: parseInt(req.params.id) },
  // });

  const deleteUser = prisma.user.delete({
    where: { id: parseInt(req.params.id) },
  });

  await prisma.$transaction([
    deleteTask,
    // deletePost,
    // deleteProfile,
    deleteUser,
  ]);
  res.json({ deleted_user: req.params.id });
});

app.listen(port, () => {
  console.log('server running');
});
