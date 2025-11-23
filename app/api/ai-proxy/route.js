export async function POST(req){
  const body = await req.json();
  const prompt = body.prompt || '';
  // Demo serverless handler - in production call OpenAI here using server-side key
  return new Response(JSON.stringify({ answer: 'Demo answer for: ' + prompt }), { status: 200, headers: { 'Content-Type':'application/json' } });
}
