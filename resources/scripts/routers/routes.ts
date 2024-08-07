import type { ComponentType } from 'react';
import { lazy } from 'react';

import DatabasesContainer from '@/components/server/databases/DatabasesContainer';
import ScheduleContainer from '@/components/server/schedules/ScheduleContainer';
import UsersContainer from '@/components/server/users/UsersContainer';
import BackupContainer from '@/components/server/backups/BackupContainer';
import NetworkContainer from '@/components/server/network/NetworkContainer';
import StartupContainer from '@/components/server/startup/StartupContainer';
import FileManagerContainer from '@/components/server/files/FileManagerContainer';
import SettingsContainer from '@/components/server/settings/SettingsContainer';
import AccountOverviewContainer from '@/components/dashboard/AccountOverviewContainer';
import AccountApiContainer from '@/components/dashboard/AccountApiContainer';
import AccountSSHContainer from '@/components/dashboard/ssh/AccountSSHContainer';
import ActivityLogContainer from '@/components/dashboard/activity/ActivityLogContainer';
import ServerActivityLogContainer from '@/components/server/ServerActivityLogContainer';

// Each of the router files is already code split out appropriately — so
// all the items above will only be loaded in when that router is loaded.
//
// These specific lazy loaded routes are to avoid loading in heavy screens
// for the server dashboard when they're only needed for specific instances.
const ServerConsoleContainer = lazy(() => import('@/components/server/console/ServerConsoleContainer'));
const FileEditContainer = lazy(() => import('@/components/server/files/FileEditContainer'));
const ScheduleEditContainer = lazy(() => import('@/components/server/schedules/ScheduleEditContainer'));

import {
    CogIcon,
    DatabaseIcon,
    FolderIcon,
    GlobeIcon,
    OfficeBuildingIcon,
    ServerIcon,
    TerminalIcon,
    UserGroupIcon,
    UsersIcon,
    ViewGridIcon,
} from '@heroicons/react/outline';

interface RouteDefinition {
    /**
     * Route is the path that will be matched against, this field supports wildcards.
     */
    route: string;
    /**
     * Path is the path that will be used for any navbars or links, do not use wildcards or fancy
     * matchers here. If this field is left undefined, this route will not have a navigation element,
     */
    path?: string;
    // If undefined is passed this route is still rendered into the router itself
    // but no navigation link is displayed in the sub-navigation menu.
    name: string | undefined;
    component: ComponentType;
    icon?: ComponentType;
    end?: boolean;
}

interface ServerRouteDefinition extends RouteDefinition {
    permission?: string | string[];
}

interface Routes {
    // All the routes available under "/account"
    account: RouteDefinition[];
    // All the routes available under "/server/:id"
    server: ServerRouteDefinition[];
    // All the routes available under "/admin"
    admin: RouteDefinition[];
}

export default {
    account: [
        {
            route: '',
            path: '',
            name: 'Account',
            component: AccountOverviewContainer,
            end: true,
        },
        {
            route: 'api',
            path: 'api',
            name: 'API Credentials',
            component: AccountApiContainer,
        },
        {
            route: 'ssh',
            path: 'ssh',
            name: 'SSH Keys',
            component: AccountSSHContainer,
        },
        {
            route: 'activity',
            path: 'activity',
            name: 'Activity',
            component: ActivityLogContainer,
        },
    ],
    server: [
        {
            route: '',
            path: '',
            permission: null,
            name: 'Console',
            component: ServerConsoleContainer,
            end: true,
        },
        {
            route: 'files/*',
            path: 'files',
            permission: 'file.*',
            name: 'Files',
            component: FileManagerContainer,
        },
        {
            route: 'files/:action/*',
            permission: 'file.*',
            name: undefined,
            component: FileEditContainer,
        },
        {
            route: 'databases/*',
            path: 'databases',
            permission: 'database.*',
            name: 'Databases',
            component: DatabasesContainer,
        },
        {
            route: 'schedules/*',
            path: 'schedules',
            permission: 'schedule.*',
            name: 'Schedules',
            component: ScheduleContainer,
        },
        {
            route: 'schedules/:id/*',
            permission: 'schedule.*',
            name: undefined,
            component: ScheduleEditContainer,
        },
        {
            route: 'users/*',
            path: 'users',
            permission: 'user.*',
            name: 'Users',
            component: UsersContainer,
        },
        {
            route: 'backups/*',
            path: 'backups',
            permission: 'backup.*',
            name: 'Backups',
            component: BackupContainer,
        },
        {
            route: 'network/*',
            path: 'network',
            permission: 'allocation.*',
            name: 'Network',
            component: NetworkContainer,
        },
        {
            route: 'startup/*',
            path: 'startup',
            permission: 'startup.*',
            name: 'Startup',
            component: StartupContainer,
        },
        {
            route: 'settings/*',
            path: 'settings',
            permission: ['settings.*', 'file.sftp'],
            name: 'Settings',
            component: SettingsContainer,
        },
        {
            route: 'activity/*',
            path: 'activity',
            permission: 'activity.*',
            name: 'Activity',
            component: ServerActivityLogContainer,
        },
    ],
    admin: [
        {
            route: '',
            path: '',
            name: 'Admin',
            component: lazy(() => import('@/components/admin/overview/OverviewContainer')),
            end: true,
            icon: OfficeBuildingIcon,
        },
        {
            route: 'settings',
            path: 'settings/*',
            name: 'Settings',
            component: lazy(() => import('@/components/admin/settings/SettingsContainer')),
            icon: CogIcon,
        },
        {
            route: 'databases',
            path: 'databases',
            name: 'Databases',
            component: lazy(() => import('@/components/admin/databases/DatabasesContainer')),
            icon: DatabaseIcon,
        },
        {
            route: 'databases/new',
            path: 'databases/new',
            name: 'NewDatabase',
            component: lazy(() => import('@/components/admin/databases/NewDatabaseContainer')),
        },
        {
            route: 'databases/:id',
            path: 'databases/:id',
            name: 'DatabaseEdit',
            component: lazy(() => import('@/components/admin/databases/DatabaseEditContainer')),
        },
        {
            route: 'locations',
            path: 'locations',
            name: 'Locations',
            component: lazy(() => import('@/components/admin/locations/LocationsContainer')),
            icon: GlobeIcon,
        },
        {
            route: 'locations/:id',
            path: 'locations/:id',
            name: 'LocationEdit',
            component: lazy(() => import('@/components/admin/locations/LocationEditContainer')),
        },
        {
            route: 'nodes',
            path: 'nodes',
            name: 'Nodes',
            component: lazy(() => import('@/components/admin/nodes/NodesContainer')),
            icon: ServerIcon,
        },
        {
            route: 'nodes/new',
            path: 'nodes/new',
            name: 'NewNode',
            component: lazy(() => import('@/components/admin/nodes/NewNodeContainer')),
        },
        {
            route: 'nodes/:id/*',
            path: 'nodes/:id/*',
            name: 'NodeRouter',
            component: lazy(() => import('@/components/admin/nodes/NodeRouter')),
        },
        {
            route: 'servers',
            path: 'servers',
            name: 'Servers',
            component: lazy(() => import('@/components/admin/servers/ServersContainer')),
            icon: TerminalIcon,
        },
        {
            route: 'servers/new',
            path: 'servers/new',
            name: 'NewServer',
            component: lazy(() => import('@/components/admin/servers/NewServerContainer')),
        },
        {
            route: 'servers/:id/*',
            path: 'servers/:id/*',
            name: 'ServerRouter',
            component: lazy(() => import('@/components/admin/servers/ServerRouter')),
        },
        {
            route: 'users',
            path: 'users',
            name: 'Users',
            component: lazy(() => import('@/components/admin/users/UsersContainer')),
            icon: UsersIcon,
        },
        {
            route: 'users/new',
            path: 'users/new',
            name: 'NewUser',
            component: lazy(() => import('@/components/admin/users/NewUserContainer')),
        },
        {
            route: 'users/:id/*',
            path: 'users/:id/*',
            name: 'UserRouter',
            component: lazy(() => import('@/components/admin/users/UserRouter')),
        },
        {
            route: 'roles',
            path: 'roles',
            name: 'Roles',
            component: lazy(() => import('@/components/admin/roles/RolesContainer')),
            icon: UserGroupIcon,
        },
        {
            route: 'roles/:id',
            path: 'roles/:id',
            name: 'RoleEdit',
            component: lazy(() => import('@/components/admin/roles/RoleEditContainer')),
        },
        {
            route: 'nests',
            path: 'nests',
            name: 'Nests',
            component: lazy(() => import('@/components/admin/nests/NestsContainer')),
            icon: ViewGridIcon,
        },
        {
            route: 'nests/:nestId',
            path: 'nests/:nestId',
            name: 'NestEdit',
            component: lazy(() => import('@/components/admin/nests/NestEditContainer')),
        },
        {
            route: 'nests/:nestId/new',
            path: 'nests/:nestId/new',
            name: 'NewEgg',
            component: lazy(() => import('@/components/admin/nests/NewEggContainer')),
        },
        {
            route: 'nests/:nestId/eggs/:id/*',
            path: 'nests/:nestId/eggs/:id/*',
            name: 'EggRouter',
            component: lazy(() => import('@/components/admin/nests/eggs/EggRouter')),
        },
        {
            route: 'mounts',
            path: 'mounts',
            name: 'Mounts',
            component: lazy(() => import('@/components/admin/mounts/MountsContainer')),
            icon: FolderIcon,
        },
        {
            route: 'mounts/new',
            path: 'mounts/new',
            name: 'NewMount',
            component: lazy(() => import('@/components/admin/mounts/NewMountContainer')),
        },
        {
            route: 'mounts/:id',
            path: 'mounts/:id',
            name: 'MountEdit',
            component: lazy(() => import('@/components/admin/mounts/MountEditContainer')),
        },
    ],
} as Routes;
