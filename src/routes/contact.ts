import { Hono } from 'hono'
import { supabase } from '../services/supabase.js'
import { triggerContactWebhook } from '../services/n8n.js'

export const contactRouter = new Hono()

contactRouter.post('/', async (c) => {
  try {
    const body = await c.req.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return c.json({ error: 'Name, email, and message are required' }, 400)
    }

    // 1. Store in Supabase
    const { data, error } = await supabase
      .from('messages')
      .insert([{ name, email, message, status: 'new' }])
      .select()

    if (error) {
      console.error('Supabase insert error:', error)
      return c.json({ error: 'Failed to save message' }, 500)
    }

    const savedMessage = data && data.length > 0 ? data[0] : { name, email, message }

    // 2. Trigger n8n Automation
    await triggerContactWebhook(savedMessage)

    return c.json({ status: 'success', message: 'Message received and processed' })
  } catch (error) {
    console.error('Contact route error:', error)
    return c.json({ error: 'Invalid request' }, 400)
  }
})
