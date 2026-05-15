import Fastify from 'fastify'

const app = Fastify({ logger: true })

app.get('/health', async () => ({ status: 'ok' }))

app.get('/users/:id', async (req) => {
  const { id } = req.params as { id: string }
  return { id, name: `User ${id}` }
})

const PORT = Number(process.env.PORT ?? 3001)
app.listen({ port: PORT }, (err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
