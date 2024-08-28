import {forwardWithCache, getJSessionId, invalidateSession} from "../utils";

export async function onRequest({request, env}) {
    const url = new URL(request.url);
    const pattern = new URLPattern({ pathname: '/api/session/:id' });
    const match = pattern.exec(url.toString());
    if (request.method !== 'GET' || match) {
        await invalidateSession(getJSessionId(request), env);
    }
    return forwardWithCache({request, env});
}
