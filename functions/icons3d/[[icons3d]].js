export async function onRequest({ request, env }) {
    const url = new URL(request.url);
    const rewrittenUrl = new URL(`${env.ICONS_3D_BASE_URL}/${url.pathname.replace("/icons3d/", "")}`);

    rewrittenUrl.search = url.search;

    const newRequest = new Request(rewrittenUrl, request);

    const response = await fetch(newRequest);

    const headers = new Headers(response.headers);
    headers.set('Cache-Control', 'max-age=31536000, public, immutable');

    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
    });
}
