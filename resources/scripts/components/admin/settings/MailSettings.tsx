import { Form, Formik, FormikHelpers } from 'formik';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import updateMailSettings, { MailSettings } from '@/api/admin/settings/updateMailSettings';
import { useEffect, useState } from 'react';
import Error, { LaravelError } from '@/components/elements/error/Error';
import { Skeleton } from '@/components/ui/skeleton';
import getMailSettings from '@/api/admin/settings/getMailSettings';
import { flushSync } from 'react-dom';

const MailSettingsForm = ({ settings }: { settings: MailSettings }) => {
    const [error, setError] = useState<LaravelError | undefined>(undefined);

    const submit = (settings: MailSettings, { setSubmitting }: FormikHelpers<MailSettings>) => {
        setError(undefined);

        updateMailSettings(settings)
            .then(() => {
                setSubmitting(false);
            })
            .catch(error => {
                setError(error.response?.data);
                setSubmitting(false);
            });
    };

    return (
        <Formik
            onSubmit={submit}
            initialValues={{
                'mail:mailers:smtp:host': settings['mail:mailers:smtp:host'],
                'mail:mailers:smtp:port': settings['mail:mailers:smtp:port'],
                'mail:mailers:smtp:encryption': settings['mail:mailers:smtp:encryption'],
                'mail:mailers:smtp:username': settings['mail:mailers:smtp:username'],
                'mail:mailers:smtp:password': '',
                'mail:from:address': settings['mail:from:address'],
                'mail:from:name': settings['mail:from:name'],
            }}
        >
            {({ isSubmitting, isValid, values }) => (
                <Form>
                    <Card>
                        <CardHeader>
                            <CardTitle>Mail Settings</CardTitle>
                            <CardDescription>Configure how the Panel should send emails to users.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {error && <Error laravelError={error} />}

                            <div className="flex gap-2 lg:flex-row flex-col">
                                <div className="lg:w-4/6 md:3/6">
                                    <Label htmlFor="smtpHost">SMTP Host</Label>
                                    <Input
                                        id="smtpHost"
                                        name="smtpHost"
                                        placeholder="smtp.example.com"
                                        className="my-2"
                                        defaultValue={values['mail:mailers:smtp:host']}
                                        disabled={isSubmitting}
                                        onChange={e => {
                                            values['mail:mailers:smtp:host'] = e.target.value;
                                        }}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="smtpPort">SMTP Port</Label>
                                    <Input
                                        id="smtpPort"
                                        name="smtpPort"
                                        placeholder="587"
                                        className="my-2"
                                        disabled={isSubmitting}
                                        defaultValue={values['mail:mailers:smtp:port']}
                                        onChange={e => {
                                            values['mail:mailers:smtp:port'] = parseInt(e.target.value);
                                        }}
                                    />
                                </div>
                                <div>
                                    <Label>SMTP Encryption</Label>
                                    <Select
                                        disabled={isSubmitting}
                                        defaultValue={values['mail:mailers:smtp:encryption']}
                                        onValueChange={value => {
                                            values['mail:mailers:smtp:encryption'] = value;
                                        }}
                                    >
                                        <SelectTrigger className="my-2">
                                            <SelectValue placeholder="Select an encryption method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>SMTP Encryption</SelectLabel>
                                                <SelectItem value="tls">Transport Layer Security (TLS</SelectItem>
                                                <SelectItem value="ssl">Secure Sockets Layer (SSL)</SelectItem>
                                                <SelectItem value="none">None (Not recommended)</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex gap-2 lg:flex-row flex-col">
                                <div className="lg:w-2/4">
                                    <Label htmlFor="username">SMTP Username</Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        placeholder="Username"
                                        className="my-2"
                                        defaultValue={values['mail:mailers:smtp:username']}
                                        disabled={isSubmitting}
                                        onChange={e => {
                                            values['mail:mailers:smtp:username'] = e.target.value;
                                        }}
                                    />
                                </div>
                                <div className="lg:w-2/4">
                                    <Label htmlFor="password">SMTP Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        className="my-2"
                                        defaultValue={values['mail:mailers:smtp:password']}
                                        disabled={isSubmitting}
                                        onChange={e => {
                                            values['mail:mailers:smtp:password'] = e.target.value;
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2 lg:flex-row flex-col">
                                <div className="lg:w-2/4">
                                    <Label htmlFor="mailfrom">MailFrom</Label>
                                    <Input
                                        id="mailfrom"
                                        name="mailfrom"
                                        placeholder="no-reply@example.com"
                                        className="my-2"
                                        defaultValue={values['mail:from:address']}
                                        disabled={isSubmitting}
                                        onChange={e => {
                                            values['mail:from:address'] = e.target.value;
                                        }}
                                    />
                                </div>
                                <div className="lg:w-2/4">
                                    <Label htmlFor="mailFromName">Mail From Name</Label>
                                    <Input
                                        id="mailFromName"
                                        name="mailFromName"
                                        placeholder="PterodactylX panel"
                                        className="my-2"
                                        defaultValue={values['mail:from:name']}
                                        disabled={isSubmitting}
                                        onChange={e => {
                                            values['mail:from:name'] = e.target.value;
                                        }}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={isSubmitting || !isValid}>
                                {(isSubmitting || !isValid) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Changes
                            </Button>
                        </CardFooter>
                    </Card>
                </Form>
            )}
        </Formik>
    );
};

export default () => {
    const [settings, setSettings] = useState<MailSettings | undefined>(undefined);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const fetchedSettings = await getMailSettings();
                if (document.startViewTransition) {
                    document.startViewTransition(() => {
                        flushSync(() => {
                            setSettings(fetchedSettings);
                        });
                    });
                } else {
                    setSettings(fetchedSettings); // Fallback if startViewTransition is not available
                }
            } catch (error) {
                console.error('Error fetching mail settings:', error);
            }
        };

        fetchSettings();
    }, []);

    if (!settings) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Mail Settings</CardTitle>
                    <CardDescription>Configure how the Panel should send emails to users.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2 lg:flex-row flex-col">
                        <div className="lg:w-4/6 md:w-3/6">
                            <Label htmlFor="smtpHost">SMTP Host</Label>
                            <Skeleton className="w-full rounded-xl h-10 mt-2" />
                        </div>
                        <div className="w-1/6">
                            <Label htmlFor="smtpPort">SMTP Port</Label>
                            <Skeleton className="w-full h-10 rounded-xl mt-2" />
                        </div>
                        <div className="w-1/6">
                            <Label>SMTP Encryption</Label>
                            <Skeleton className="w-full rounded-xl h-10 mt-2" />
                        </div>
                    </div>
                    <div className="flex gap-2 lg:flex-row flex-col mt-2">
                        <div className="lg:w-2/4">
                            <Label htmlFor="username">SMTP Username</Label>
                            <Skeleton className="w-full rounded-xl h-10 mt-2" />
                        </div>
                        <div className="lg:w-2/4">
                            <Label htmlFor="password">SMTP Password</Label>
                            <Skeleton className="w-full rounded-xl h-10 mt-2" />
                        </div>
                    </div>
                    <div className="flex gap-2 lg:flex-row flex-col mt-2">
                        <div className="lg:w-2/4">
                            <Label htmlFor="mailfrom">MailFrom</Label>
                            <Skeleton className="w-full rounded-xl h-10 mt-2" />
                        </div>
                        <div className="lg:w-2/4">
                            <Label htmlFor="mailFromName">Mail From Name</Label>
                            <Skeleton className="w-full rounded-xl h-10 mt-2" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button disabled className="mt-2">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading Settings
                    </Button>
                </CardFooter>
            </Card>
        );
    } else {
        return <MailSettingsForm settings={settings} />;
    }
};
