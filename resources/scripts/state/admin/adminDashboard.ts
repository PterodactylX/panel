import { Action, action } from 'easy-peasy';

interface AdminDashboard {
    isSearchingOpen: boolean;
    toggleSearching: Action<AdminDashboard>;
    setSearchingOpen: Action<AdminDashboard, boolean>;
}

const adminDashboard: AdminDashboard = {
    isSearchingOpen: false,

    toggleSearching: action(state => {
        state.isSearchingOpen = !state.isSearchingOpen;
    }),

    setSearchingOpen: action((state, payload) => {
        state.isSearchingOpen = payload;
    }),
};

export type { AdminDashboard };
export default adminDashboard;
