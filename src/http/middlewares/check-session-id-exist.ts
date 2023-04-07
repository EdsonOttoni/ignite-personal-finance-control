import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkSessionIdExist(
  request: FastifyRequest,
  replay: FastifyReply
) {
  const { sessionId } = request.cookies

  if (!sessionId) {
    return replay.status(401).send({
      error: 'Unauthorized',
    })
  }
}
