import { Express, Request, Response } from 'express';
import * as express from 'express';
import {} from 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const app: Express = express();
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

app.listen(port, () => {
  console.log('server running');
});
