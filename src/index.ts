import 'dotenv/config'
import cookie from '@fastify/cookie'
import fastify from 'fastify'

import { transactionsRoutes } from './http/routes/transactions'
import { usersRoutes } from './http/routes/users'
import { env } from './utils/env'

async function initializedServer() {
  const app = fastify()

  app.register(cookie)

  app.register(usersRoutes, {
    prefix: 'users',
  })
  app.register(transactionsRoutes, {
    prefix: 'transactions',
  })

  try {
    await app.listen({ port: env.PORT })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

initializedServer()
