import { AdjustmentsIcon, ChipIcon, CodeIcon, MailIcon, ShieldCheckIcon } from '@heroicons/react/outline';
import { Route, Routes } from 'react-router-dom';
import tw from 'twin.macro';

import AdminContentBlock from '@/components/admin/AdminContentBlock';
import MailSettings from '@/components/admin/settings/MailSettings';
import FlashMessageRender from '@/components/FlashMessageRender';
import { SubNavigation, SubNavigationLink } from '@/components/admin/SubNavigation';
import GeneralSettings from '@/components/admin/settings/GeneralSettings';
import SecuritySettingsContainer from '@/components/admin/settings/security/SecuritySettingsContainer';
import Header from '@/components/elements/header';

export default () => {
    return (
        <AdminContentBlock title={'Settings'}>
            <div css={tw`w-full flex flex-row items-center mb-8`}>
                <Header>
                    <Header.Title>Settings</Header.Title>
                    <Header.SubTitle>Configure and manage settings for Pterodactyl.</Header.SubTitle>
                </Header>
            </div>

            <FlashMessageRender byKey={'admin:settings'} css={tw`mb-4`} />

            <SubNavigation>
                <SubNavigationLink to="/admin/settings" name="General" viewTransition>
                    <ChipIcon />
                </SubNavigationLink>
                <SubNavigationLink to="/admin/settings/mail" name="Mail" viewTransition>
                    <MailIcon />
                </SubNavigationLink>
                <SubNavigationLink to="/admin/settings/security" name="Security" viewTransition>
                    <ShieldCheckIcon />
                </SubNavigationLink>
                <SubNavigationLink to="/admin/settings/features" name="Features" viewTransition>
                    <AdjustmentsIcon />
                </SubNavigationLink>
                <SubNavigationLink to="/admin/settings/advanced" name="Advanced" viewTransition>
                    <CodeIcon />
                </SubNavigationLink>
            </SubNavigation>

            <Routes>
                <Route path="" element={<GeneralSettings />} />
                <Route path="mail" element={<MailSettings />} />
                <Route path="security" element={<SecuritySettingsContainer />} />
                <Route path="features" element={<p>Features</p>} />
                <Route path="advanced" element={<p>Advanced</p>} />
            </Routes>
        </AdminContentBlock>
    );
};
