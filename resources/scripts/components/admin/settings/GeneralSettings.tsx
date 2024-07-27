import { Form, Formik, FormikHelpers } from 'formik';
import tw from 'twin.macro';

import AdminBox from '@/components/admin/AdminBox';
import Field, { FieldRow } from '@/components/elements/Field';
import Button from '@/components/elements/Button';
import updateGeneralSettings, { Settings } from '@/api/admin/settings/updateGeneralSettings';
import { ApplicationStore } from '@/state';
import { useStoreState } from 'easy-peasy';
import useFlash from '@/plugins/useFlash';
import { store } from '@/state';

export default () => {
    const settings = useStoreState((state: ApplicationStore) => state.settings.data);

    const { clearFlashes, clearAndAddHttpError } = useFlash();

    const submit = (settings: Settings, { setSubmitting }: FormikHelpers<Settings>) => {
        clearFlashes('location:create');

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
            });
    };

    return (
        <Formik
            onSubmit={submit}
            initialValues={{
                name: settings?.name || '',
                // todo: add analytics to settings
                analytics: '',
            }}
        >
            {({ isSubmitting, isValid }) => (
                <Form>
                    <div css={tw`grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6`}>
                        <AdminBox title="Branding" isLoading={isSubmitting}>
                            <FieldRow>
                                <Field id={'name'} name={'name'} type={'text'} label={'App Name'} description={''} />
                            </FieldRow>
                            <Button type="submit" size="small" css={tw`ml-auto`} disabled={isSubmitting || !isValid}>
                                Save Changes
                            </Button>
                        </AdminBox>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
