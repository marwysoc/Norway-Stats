import create from 'zustand'

import { devtools, persist } from 'zustand/middleware'

interface UserAuthStore {
    loggedInUser: string | null;
    isUserLoggedIn: boolean;
    login: (userEmail: string) => void;
    logout: () => void;
}

export const useUserAuthStore = create<UserAuthStore>()(
    devtools(
        persist((set) => ({
            loggedInUser: null,
            isUserLoggedIn: false,
            login: (userEmail) => set((state) => ({ ...state, loggedInUser: userEmail, isUserLoggedIn: true })),
            logout: () => set((state) => ({ ...state, loggedInUser: null, isUserLoggedIn: false }))
        })),
        {
            name: 'isUserLoggedIn'
        }
    )
)