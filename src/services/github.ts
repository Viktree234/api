import dotenv from 'dotenv'

dotenv.config()

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'victob'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

const headers: HeadersInit = {
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'api.victob.name.ng'
}

if (GITHUB_TOKEN) {
  headers['Authorization'] = `token ${GITHUB_TOKEN}`
}

export async function fetchGitHubProfile() {
  const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers })
  if (!res.ok) throw new Error(`GitHub API error: ${res.statusText}`)
  return res.json()
}

export async function fetchGitHubRepos() {
  const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`, { headers })
  if (!res.ok) throw new Error(`GitHub API error: ${res.statusText}`)
  return res.json()
}

export async function fetchGitHubActivity() {
  const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`, { headers })
  if (!res.ok) throw new Error(`GitHub API error: ${res.statusText}`)
  return res.json()
}
