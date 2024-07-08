addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const pathname = url.pathname

  if (request.method === 'GET' && pathname === '/generate-invite') {
    return generateInviteCode()
  }

  if (request.method === 'POST' && pathname === '/signup') {
    return handleSignup(request)
  }

  return new Response('Not Found', { status: 404 })
}

async function generateInviteCode() {
  const inviteCode = `artemas_${Math.random().toString(36).substr(2, 10)}`
  await INVITE_CODES.put(inviteCode, 'valid')

  return new Response(`Generated invite code: ${inviteCode}`, {
    status: 200,
    headers: { 'Content-Type': 'text/plain' }
  })
}

async function handleSignup(request) {
  const { inviteCode, username, password } = await request.json()

  const inviteExists = await INVITE_CODES.get(inviteCode)

  if (!inviteExists) {
    return new Response(JSON.stringify({ error: 'Invalid invite code' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // Here you would normally create the user in your database
  // For simplicity, we'll just return a success response

  // Remove the invite code to prevent reuse
  await INV
