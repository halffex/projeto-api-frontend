import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

// ROTA CRIAR USUARIOS
app.post('/usuarios', async (req, res) => {
  
  await prisma.user.create({
    data: {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email
    }
  }) 

  res.status(201).json(req.body)
})

// ROTA UPDATE USUARIO PELO ID
app.put('/usuarios/:id', async (req, res) => {
  
  await prisma.user.update({
    where: {
      id: req.params.id
    },
    data: {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email
    }
  }) 

  res.status(201).json(req.body)
})

// ROTA EXIBIR USUARIOS
app.get('/usuarios', async (req, res) => {

  const users = await prisma.user.findMany()

  res.status(200).json(users)
})

// ROTA DELETAR USUARIO PELO ID
app.delete('/usuarios/:id', async (req, res) => {
  
  await prisma.user.delete({
    where: {
      id: req.params.id
    }
  })

  res.status(200).json({ message: "Usuário deletado com Sucesso!" })
})

app.listen(3000) 