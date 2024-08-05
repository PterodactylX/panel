import { Form, Formik, FormikHelpers } from 'formik';
import { Button } from '@/components/ui/button';
import Error, { LaravelError } from '@/components/elements/error/Error';
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import get2faSettings, { TwoFactorSettings } from '@/api/admin/settings/get2faSettings';
import update2faSettings from '@/api/admin/settings/update2faSettings';
import { Skeleton } from '@/components/ui/skeleton';
import { flushSync } from 'react-dom';
import { useStoreState } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';

export default () => {
    const [error, setError] = useState<LaravelError | undefined>(undefined);
    const [mode, setMode] = useState<string | undefined>(undefined);
    const isUser2fa = useStoreState(state => state.user.data!.useTotp);
    const navigate = useNavigate();

    const submit = (settings: TwoFactorSettings, { setSubmitting }: FormikHelpers<TwoFactorSettings>) => {
        setError(undefined);

        update2faSettings(settings)
            .then(() => {
                setSubmitting(false);
                if (!isUser2fa && settings.mode !== 'disable') {
                    navigate('/account');
                }
            })
            .catch(error => {
                setError(error);
                setSubmitting(false);
            });
    };

    useEffect(() => {
        get2faSettings().then(data => {
            if (document.startViewTransition) {
                document.startViewTransition(() => {
                    flushSync(() => {
                        setMode(data.mode);
                    });
                });
            } else {
                setMode(data.mode);
            }
        });
    }, []);

    return (
        <Formik
            onSubmit={submit}
            initialValues={{
                mode: 'disable',
            }}
        >
            {({ isSubmitting, isValid, values }) => (
                <Form>
                    <Card className="lg:w-[500px] m-full">
                        <CardHeader>
                            <CardTitle>Require 2-Factor Authentication</CardTitle>
                            <CardDescription>
                                Which users should be required to use 2-Factor Authentication when logging into the
                                Panel.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Error laravelError={error} />

                            <Label htmlFor="name">Require 2-Factor Authentication mode</Label>
                            {!mode ? (
                                <Skeleton className="h-10 my-1" />
                            ) : (
                                <Select
                                    disabled={isSubmitting}
                                    defaultValue={mode}
                                    onValueChange={e => {
                                        values.mode = e;
                                    }}
                                >
                                    <SelectTrigger className="my-2">
                                        <SelectValue placeholder="Select an encryption method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Require 2-Factor Authentication mode</SelectLabel>
                                            <SelectItem value="disable">Not required</SelectItem>
                                            <SelectItem value="admin">Admin Only</SelectItem>
                                            <SelectItem value="all">All users</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
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
