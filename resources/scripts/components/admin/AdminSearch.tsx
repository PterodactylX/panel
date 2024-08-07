import { AdminContext } from '@/state/admin';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '../ui/command';
import { useEffect } from 'react';
import routes from '@/routers/routes';
import { useNavigate } from 'react-router-dom';

const AdminCommand = () => {
    const isSearchOpen = AdminContext.useStoreState(state => state.adminDashboard.isSearchingOpen);
    const setSearching = AdminContext.useStoreActions(actions => actions.adminDashboard.setSearchingOpen);
    const toggleSearching = AdminContext.useStoreActions(actions => actions.adminDashboard.toggleSearching);
    const navigate = useNavigate();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                toggleSearching();
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    return (
        <CommandDialog open={isSearchOpen} onOpenChange={setSearching}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                    {routes.admin
                        .filter(route => route.icon !== undefined && route.name !== undefined)
                        .map(({ route, name, icon: Icon }) => (
                            <CommandItem
                                key={name}
                                onSelect={() => {
                                    navigate(`${route}`);
                                    setSearching(false);
                                }}
                            >
                                {/* @ts-expect-error the component is always an icon */}
                                <Icon className="mr-2 h-4 w-4" />
                                <span>{name}</span>
                            </CommandItem>
                        ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
};

export default AdminCommand;
