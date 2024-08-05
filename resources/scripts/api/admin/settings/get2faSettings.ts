import http from '@/api/http';

export interface TwoFactorSettings {
    mode: string;
}

export default async (): Promise<TwoFactorSettings> => {
    const { data } = await http.get('/api/application/settings/2fa');
    return data;
};
