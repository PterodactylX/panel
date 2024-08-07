import tw from 'twin.macro';
import { Button } from '../ui/button';
import { AdminContext } from '@/state/admin';
import { Search } from 'lucide-react';

const NavBar = () => {
    const toggleSearching = AdminContext.useStoreActions(actions => actions.adminDashboard.toggleSearching);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light h-16">
            <div className="flex justify-between">
                <div css={tw`h-16 w-full flex flex-col justify-center mt-1 mb-3 select-none cursor-pointer ml-4`}></div>
                <div
                    css={tw`h-16 w-full flex flex-col items-end justify-center mt-1 mb-3 select-none cursor-pointer mr-6`}
                >
                    <Button
                        variant="outline"
                        className="flex gap-2 w-60 text-left justify-start text-gray-500"
                        onClick={() => toggleSearching()}
                    >
                        <Search size={24} /> Search
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
