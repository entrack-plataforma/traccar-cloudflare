import { Capacitor } from '@capacitor/core';

// forward api requests
if (Capacitor.isNativePlatform()) {
    const oldFetch = window.fetch;
    window.fetch = async (url, options) => {
        if (typeof url === 'string' && url.startsWith('/api')) {
            url = `https://${import.meta.env.VITE_TRACCAR_SERVER}${url}`;
        }
        return oldFetch(url, options);
    };
}

