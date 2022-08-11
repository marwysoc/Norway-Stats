import create from 'zustand'

import { devtools, persist } from 'zustand/middleware'

export interface User {
    id: string | number,
    email: string;
    password: string;
    username?: string;
    isLoggedIn: boolean;
}

interface UsersStore {
    users: User[];
    addNewUser: (user: User) => void;
    addUsername: (id: (string | number), username: string) => void;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const initialUsers: User[] = [
    {
        id: Math.floor(Math.random() * 100),
        email: 'admin1@admin.pl',
        password: 'admin1',
        isLoggedIn: false
    },
    {
        id: Math.floor(Math.random() * 100),
        email: 'admin2@admin.pl',
        password: 'admin2',
        isLoggedIn: false
    }
]

export const useUsersStore = create<UsersStore>()(
    devtools(
        persist((set) => ({
            users: initialUsers,
            addNewUser: (user) => set((state) => ({ ...state, users: { ...state.users, user } })),
            addUsername: (id, username) => set((state) => ({
                ...state,
                users: state.users.map((user) =>
                    user.id === id
                        ? ({ ...user, username: username } as User)
                        : user
                )
            })),
            login: (email, password) => set((state) => ({
                ...state,
                users: state.users.map((user) =>
                    user.email === email && user.password === password
                        ? ({ ...user, isLoggedIn: true })
                        : user
                )
            })),
            logout: () => set((state) => ({
                ...state,
                users: state.users.map((user) => ({ ...user, isLoggedIn: false })
                )
            }))
        })
        )))

