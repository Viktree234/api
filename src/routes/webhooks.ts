import { Hono } from 'hono'

export const webhooksRouter = new Hono()

webhooksRouter.post('/contact', async (c) => c.json({ status: 'processed' }))
webhooksRouter.post('/github', async (c) => c.json({ status: 'processed' }))
webhooksRouter.post('/automation', async (c) => c.json({ status: 'processed' }))
