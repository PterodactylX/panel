import http from '@/api/http';

export interface MailSettings {
    'mail:mailers:smtp:host': string;
    'mail:mailers:smtp:port': number;
    'mail:mailers:smtp:encryption': string;
    'mail:mailers:smtp:username': string;
    'mail:mailers:smtp:password': string;
    'mail:from:address': string;
    'mail:from:name': string;
}

export default (settings: MailSettings): Promise<void> => {
    return http.patch('/api/application/settings/mail', settings);
};
