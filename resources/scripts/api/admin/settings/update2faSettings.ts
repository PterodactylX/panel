import http from '@/api/http';
import { TwoFactorSettings } from './get2faSettings';

export default async (data: TwoFactorSettings): Promise<void> => {
    await http.patch('/api/application/settings/2fa', data);
};
