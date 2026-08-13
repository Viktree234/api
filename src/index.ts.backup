import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'

import { portfolioRouter } from './routes/portfolio.js'
import { githubRouter } from './routes/github.js'
import { contactRouter } from './routes/contact.js'
import { agentRouter } from './routes/agent.js'
import { webhooksRouter } from './routes/webhooks.js'

const app = new Hono()

app.use('*', logger())

app.get('/', (c) => c.json({ status: 'ok', service: 'api.victob.name.ng' }))

app.route('/portfolio', portfolioRouter)
app.route('/github', githubRouter)
app.route('/contact', contactRouter)
app.route('/agent', agentRouter)
app.route('/webhooks', webhooksRouter)

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
