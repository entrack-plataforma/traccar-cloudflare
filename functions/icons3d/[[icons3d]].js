export function onRequest({ request, env }) {
    const url = new URL(request.url);
    const rewrittenUrl = new URL(`${env.ICONS_3D_BASE_URL}/${url.pathname.replace("/icons3d/", "")}`);

    // Append the query string from the original request to the rewritten URL
    rewrittenUrl.search = url.search;

    // Create a new request with the rewritten URL and original request options
    const newRequest = new Request(rewrittenUrl, request);

    // Fetch the response from the new URL and return it
    return fetch(newRequest);
}
