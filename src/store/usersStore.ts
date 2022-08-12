import create from 'zustand'

import { devtools, persist } from 'zustand/middleware'

import { v4 as uuidv4 } from 'uuid'

export interface User {
    id: any;
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
        id: uuidv4(),
        email: 'admin1@admin.pl',
        password: 'admin1',
        isLoggedIn: false
    },
    {
        id: uuidv4(),
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
                        ? ({ ...user, username: username })
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

