import dotenv from 'dotenv'

dotenv.config()

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL

export async function triggerContactWebhook(payload: { id?: number | string; name: string; email: string; message: string }) {
  if (!N8N_WEBHOOK_URL) {
    console.warn('No N8N_WEBHOOK_URL configured. Skipping automation trigger.')
    return false
  }

  try {
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    
    if (!res.ok) {
      console.error(`n8n webhook failed: ${res.statusText}`)
      return false
    }
    
    return true
  } catch (error) {
    console.error('Failed to trigger n8n webhook:', error)
    return false
  }
}
