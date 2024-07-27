import http from '@/api/http';

export interface Settings {
    name: string;
    analytics: string;
}

export default (settings: Settings): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.patch('/api/application/settings/general', {
            name: settings.name,
            analytics: settings.analytics,
        })
        .then(() => resolve())
        .catch(reject);
    });
};
