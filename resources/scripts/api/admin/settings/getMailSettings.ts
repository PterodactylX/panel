import http from '@/api/http';
import { MailSettings } from './updateMailSettings';

export default (): Promise<MailSettings> => {
    return http.get('/api/application/settings/mail').then(response => response.data);
};
