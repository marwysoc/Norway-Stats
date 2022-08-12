import { useUsersStore } from '../store'

const useLoggedInUser = () => {
    const usersStore = useUsersStore()

    const userArray = usersStore.users.filter(u => u.isLoggedIn === true)
    const loggedInUser = userArray.length === 0 ? null : userArray[0] 
    
    return loggedInUser
}

export { useLoggedInUser }