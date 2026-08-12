import { Hono } from 'hono'

export const agentRouter = new Hono()

agentRouter.get('/status', (c) => c.json({ status: 'online' }))
