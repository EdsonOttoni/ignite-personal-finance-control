import 'dotenv/config'
import fastify from 'fastify'

import { transactionsRoutes } from './routes/transactions'
import { env } from './utils/env'

async function initializedServer() {
  const app = fastify({ logger: true })

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
