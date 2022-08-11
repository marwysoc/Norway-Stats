import create from 'zustand'

import { devtools, persist } from 'zustand/middleware'

export interface User {
    id: string | number,
    email: string;
    password: string;
    username?: string;
}

interface UsersStore {
    users: User[];
    addUser: (user: User) => void;
    addUsername: (id: (string | number), username: string) => void;
}

const initialUsers: User[] = [
    {
        id: Math.floor(Math.random() * 100),
        email: 'admin1@admin.pl',
        password: 'admin1'
    },
    {
        id: Math.floor(Math.random() * 100),
        email: 'admin2@admin.pl',
        password: 'admin2'
    }
]

export const useUsersStore = create<UsersStore>()(
    devtools(
        persist((set) => ({
            users: initialUsers,
            addUser: (user) => set((state) => ({ ...state, users: {...state.users, user} })),
            addUsername: (id, username) => set((state) => ({
                ...state,
                users: state.users.map((user) =>
                    user.id === id
                        ? ({ ...user, username: username } as User)
                        : user
                )
            }))
        })),
        {
            name: 'users'
        }
    )
)
