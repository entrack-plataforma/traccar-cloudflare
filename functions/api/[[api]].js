export async function onRequest({request, env}) {
    const url = new URL(request.url)
    const cookie = request.headers.get('Cookie') || '';

    if (url.pathname === '/api/positions' && env.POSITIONS_SERVER) {
        const jSessionId = getCookie(cookie, 'JSESSIONID')
        if (jSessionId) {
            url.searchParams.set('JSESSIONID', jSessionId)
        }
        url.hostname = env.POSITIONS_SERVER
        return Response.redirect(url, 302)
    }

    const auth = request.headers.get('Authorization') || '';
    const cacheKey = new Request(
        `${url.toString()}${url.search ? '&' : '?'}cookie=${encodeURIComponent(cookie)}&auth=${encodeURIComponent(auth)}`,
        { method: request.method, headers: request.headers }
    );
    const cache = caches.default;
    let response = await cache.match(cacheKey);

    if (!response || request.method !== 'GET') {
        console.log(`${cacheKey} not present in cache. Fetching and caching request.`,);
        url.host = env.TRACCAR_SERVER
        url.protocol = 'http:'
        response = await fetch(new Request(url, request))
        if (!response.ok) {
            console.error(response.status, await response.text())
            return new Response('server error ' + response.status, {status: response.status});
        }
        response.headers.append("Cache-Control", "s-maxage=10");
        ctx.waitUntil(cache.put(cacheKey, response.clone()));
    } else {
        console.log(`Cache hit for: ${cacheKey}.`);
    }
    return response
}

function getCookie(cookies, name) {
    const cookieArr = cookies.split(';')
    for (let cookie of cookieArr) {
        const [key, value] = cookie.trim().split('=')
        if (key === name) {
            return value
        }
    }
    return null
}
