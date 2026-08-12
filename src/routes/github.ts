import { Hono } from 'hono'
import { fetchGitHubProfile, fetchGitHubRepos, fetchGitHubActivity } from '../services/github.js'

export const githubRouter = new Hono()

githubRouter.get('/profile', async (c) => {
  try {
    const data = await fetchGitHubProfile()
    return c.json({ profile: data })
  } catch (error: any) {
    return c.json({ error: error.message }, 500)
  }
})

githubRouter.get('/repos', async (c) => {
  try {
    const data = await fetchGitHubRepos()
    return c.json({ repos: data })
  } catch (error: any) {
    return c.json({ error: error.message }, 500)
  }
})

githubRouter.get('/activity', async (c) => {
  try {
    const data = await fetchGitHubActivity()
    return c.json({ activity: data })
  } catch (error: any) {
    return c.json({ error: error.message }, 500)
  }
})
