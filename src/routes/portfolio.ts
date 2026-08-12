import { Hono } from 'hono'
import { supabase } from '../services/supabase.js'

export const portfolioRouter = new Hono()

portfolioRouter.get('/', (c) => c.json({ message: 'Portfolio Root' }))

portfolioRouter.get('/projects', async (c) => {
  const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
  if (error) return c.json({ error: error.message }, 500)
  return c.json({ projects: data })
})

portfolioRouter.get('/skills', async (c) => {
  const { data, error } = await supabase.from('skills').select('*')
  if (error) return c.json({ error: error.message }, 500)
  return c.json({ skills: data })
})

portfolioRouter.get('/experience', async (c) => {
  const { data, error } = await supabase.from('experience').select('*').order('start_date', { ascending: false })
  if (error) return c.json({ error: error.message }, 500)
  return c.json({ experience: data })
})

portfolioRouter.get('/links', async (c) => {
  const { data, error } = await supabase.from('links').select('*')
  if (error) return c.json({ error: error.message }, 500)
  return c.json({ links: data })
})
