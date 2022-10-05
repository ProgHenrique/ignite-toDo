import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(cors())

app.get('/todos', async (request, response) => {
  const todos = await prisma.todo.findMany()

  return response.json(todos)
})

app.post('/todos', async (request, response) => {
  const { content } = request.body;
  await prisma.todo.create({
    data: {
      content,
      isConcluded: false
    }
  })

  return response.status(201).send()
})

app.patch('/todos/concluded/:id', async (request, response) => {
  const { id } = request.params;
  const { isConcluded } = request.body;
  await prisma.todo.update({
    where: {
      id
    },
    data: {
      isConcluded
    }
  });

  return response.status(200).send(`isConcluded is set now as ${isConcluded}`)
})

app.delete('/todos/:id', async (request, response) => {
  const { id } = request.params;
  await prisma.todo.delete({
    where: {
      id
    }
  });

  return response.send(`${id} deleted`)
})

app.listen(3333, () => console.log("server on"))
