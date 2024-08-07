import {
    CogIcon,
    DatabaseIcon,
    FolderIcon,
    GlobeIcon,
    OfficeBuildingIcon,
    ReplyIcon,
    ServerIcon,
    TerminalIcon,
    UserGroupIcon,
    UsersIcon,
    ViewGridIcon,
} from '@heroicons/react/outline';
import { useStoreState } from 'easy-peasy';
import { NavLink, Route, Routes } from 'react-router-dom';
import tw from 'twin.macro';

import { NotFound } from '@/components/elements/ScreenBlock';
import type { ApplicationStore } from '@/state';
import Sidebar from '@/components/admin/Sidebar';
import NavBar from '@/components/admin/Navbar';
import AdminSearch from '@/components/admin/AdminSearch';
import routes from './routes';
import Spinner from '@/components/elements/Spinner';
import ErrorBoundary from '@/components/elements/ErrorBoundary';

function AdminRouter() {
    const email = useStoreState((state: ApplicationStore) => state.user.data!.email);
    const roleName = useStoreState((state: ApplicationStore) => state.user.data!.roleName);
    const avatarURL = useStoreState((state: ApplicationStore) => state.user.data!.avatarURL);
    const applicationName = useStoreState((state: ApplicationStore) => state.settings.data!.name);

    return (
        <>
            <AdminSearch />
            <div css={tw`h-screen flex`}>
                <Sidebar css={tw`flex-none`}>
                    <div
                        css={tw`h-16 w-full flex flex-col items-center justify-center mt-1 mb-3 select-none cursor-pointer`}
                    >
                        <h1 css={tw`text-2xl text-primary whitespace-nowrap font-medium`}>{applicationName}</h1>
                    </div>
                    <Sidebar.Wrapper>
                        <Sidebar.Section>Administration</Sidebar.Section>
                        <NavLink to="/admin" end>
                            <OfficeBuildingIcon />
                            <span>Overview</span>
                        </NavLink>
                        <NavLink to="/admin/settings">
                            <CogIcon />
                            <span>Settings</span>
                        </NavLink>
                        <Sidebar.Section>Management</Sidebar.Section>
                        <NavLink to="/admin/databases">
                            <DatabaseIcon />
                            <span>Databases</span>
                        </NavLink>
                        <NavLink to="/admin/locations">
                            <GlobeIcon />
                            <span>Locations</span>
                        </NavLink>
                        <NavLink to="/admin/nodes">
                            <ServerIcon />
                            <span>Nodes</span>
                        </NavLink>
                        <NavLink to="/admin/servers">
                            <TerminalIcon />
                            <span>Servers</span>
                        </NavLink>
                        <NavLink to="/admin/users">
                            <UsersIcon />
                            <span>Users</span>
                        </NavLink>
                        <NavLink to="/admin/roles">
                            <UserGroupIcon />
                            <span>Roles</span>
                        </NavLink>
                        <Sidebar.Section>Service Management</Sidebar.Section>
                        <NavLink to="/admin/nests">
                            <ViewGridIcon />
                            <span>Nests</span>
                        </NavLink>
                        <NavLink to="/admin/mounts">
                            <FolderIcon />
                            <span>Mounts</span>
                        </NavLink>
                    </Sidebar.Wrapper>
                    <NavLink to="/" css={tw`mt-auto mb-3`}>
                        <ReplyIcon />
                        <span>Return</span>
                    </NavLink>
                    <Sidebar.User>
                        {avatarURL && (
                            <img
                                src={`${avatarURL}?s=64`}
                                alt="Profile Picture"
                                css={tw`h-10 w-10 rounded-full select-none`}
                            />
                        )}
                        <div css={tw`flex flex-col ml-3`}>
                            <span
                                css={tw`font-sans font-normal text-sm text-neutral-50 whitespace-nowrap leading-tight select-none`}
                            >
                                {email}
                            </span>
                            <span
                                css={tw`font-header font-normal text-xs text-neutral-300 whitespace-nowrap leading-tight select-none`}
                            >
                                {roleName}
                            </span>
                        </div>
                    </Sidebar.User>
                </Sidebar>

                <div css={tw`flex-1`}>
                    <NavBar />
                    <div className=" overflow-x-hidden px-6 pt-6 lg:px-10 lg:pt-8 xl:px-16 xl:pt-12">
                        <div css={tw`w-full flex flex-col mx-auto`} style={{ maxWidth: '86rem' }}>
                            <ErrorBoundary>
                                <Routes>
                                    {routes.admin.map(({ path, component: Component }) => (
                                        <Route
                                            key={path}
                                            path={`${path}`.replace(/\/$/, '')}
                                            element={
                                                <Spinner.Suspense>
                                                    <Component />
                                                </Spinner.Suspense>
                                            }
                                        />
                                    ))}
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </ErrorBoundary>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminRouter;
