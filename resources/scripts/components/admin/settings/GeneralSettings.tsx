import { Form, Formik, FormikHelpers } from 'formik';
import { Button } from '@/components/ui/button';
import updateGeneralSettings, { Settings } from '@/api/admin/settings/updateGeneralSettings';
import { ApplicationStore } from '@/state';
import { useStoreState } from 'easy-peasy';
import useFlash from '@/plugins/useFlash';
import { store } from '@/state';
import Error, { LaravelError } from '@/components/elements/error/Error';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default () => {
    const settings = useStoreState((state: ApplicationStore) => state.settings.data);

    const { clearFlashes, clearAndAddHttpError } = useFlash();
    const [error, setError] = useState<LaravelError | undefined>(undefined);

    const submit = (settings: Settings, { setSubmitting }: FormikHelpers<Settings>) => {
        clearFlashes('location:create');
        setError(undefined);

        updateGeneralSettings({
            name: settings.name,
            analytics: settings.analytics,
        })
            .then(() => {
                setSubmitting(false);
                store.getActions().settings.setSettings({
                    ...store.getState().settings.data!,
                    name: settings.name,
                });
            })
            .catch(error => {
                clearAndAddHttpError({ key: 'location:create', error });
                setSubmitting(false);
                setError(error.response?.data);
            });
    };

    return (
        <Formik
            onSubmit={submit}
            initialValues={{
                name: settings?.name || '',
                // TODO: add analytics to settings
                analytics: '',
            }}
        >
            {({ isSubmitting, isValid, values }) => (
                <Form>
                    <Card className="lg:w-[500px] m-full">
                        <CardHeader>
                            <CardTitle>Branding</CardTitle>
                            <CardDescription>
                                Change the title of the panel in the navigation menus and the page title
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Error laravelError={error} />

                            <Label htmlFor="name">Panel Name</Label>
                            <Input
                                type="text"
                                name="name"
                                className="mt-2"
                                id="name"
                                placeholder="Panel name"
                                defaultValue={values.name}
                                disabled={isSubmitting}
                                onChange={e => {
                                    values.name = e.target.value;
                                }}
                            />
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
