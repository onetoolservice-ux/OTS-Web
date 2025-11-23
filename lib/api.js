// API wrapper example to call serverless AI endpoint
export async function askAI(prompt){
  const res = await fetch('/api/ai-proxy', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ prompt }) })
  if(!res.ok) throw new Error('API error')
  return res.json()
}
