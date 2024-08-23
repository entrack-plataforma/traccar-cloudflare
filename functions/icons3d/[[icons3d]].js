export async function onRequest({ request, env }) {
    const url = new URL(request.url);
    const rewrittenUrl = new URL(`${env.ICONS_3D_BASE_URL}/${url.pathname.replace("/icons3d/", "")}`);

    rewrittenUrl.search = url.search;

    const newRequest = new Request(rewrittenUrl, request);

    const cache = caches.default;
    let response = await cache.match(newRequest);

    if (!response) {
        // If not in cache, fetch from the origin
        response = await fetch(newRequest);
        const headers = new Headers(response.headers);
        headers.set('Cache-Control', 'max-age=31536000, public, immutable');

        response = new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers,
        });
        await cache.put(newRequest, response.clone());
    }

    return response

}
