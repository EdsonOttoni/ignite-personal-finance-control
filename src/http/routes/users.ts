import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { knex } from '../../database'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', async (request, replay) => {
    const postUserBodySchema = z.object({
      username: z.string(),
      password: z.string(),
    })

    const { username, password } = postUserBodySchema.parse(request.body)

    const alreadyExistUser = await knex('users')
      .select('*')
      .where('username', username)
      .first()

    if (alreadyExistUser)
      return replay.status(205).send({ message: 'usuário já existente' })

    await knex('users').insert({
      id: randomUUID(),
      username,
      password,
    })

    return replay.status(201).send({ message: 'usuário criado com sucesso' })
  })

  app.post('/login', async () => {
    return
  })
}
