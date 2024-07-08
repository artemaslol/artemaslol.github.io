addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const USERS = {};

async function handleRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname === '/signup') {
    return handleSignup(request);
  } else if (pathname === '/login') {
    return handleLogin(request);
  } else if (pathname.startsWith('/view')) {
    return handleView(request);
  } else if (pathname.startsWith('/analytics')) {
    return handleAnalytics(request);
  } else {
    return fetch(request);
  }
}

async function handleSignup(request) {
  const { username, password } = await request.json();
  if (USERS[username]) {
    return new Response('User already exists', { status: 409 });
  }
  USERS[username] = { password, views: 0 };
  return Response.redirect(`https://artemas.lol/analytics?username=${username}`, 302);
}

async function handleLogin(request) {
  const { username, password } = await request.json();
  const user = USERS[username];
  if (!user || user.password !== password) {
    return new Response('Invalid credentials', { status: 401 });
  }
  return new Response('Login successful', { status: 200 });
}

async function handleView(request) {
  const { username } = await request.json();
  const user = USERS[username];
  if (user) {
    user.views += 1;
    return new Response('View recorded', { status: 200 });
  }
  return new Response('User not found', { status: 404 });
}

async function handleAnalytics(request) {
  const url = new URL(request.url);
  const username = url.searchParams.get('username');
  const user = USERS[username];
  if (user) {
    return new Response(JSON.stringify({ views: user.views }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
  }
  return new Response('User not found', { status: 404 });
}
