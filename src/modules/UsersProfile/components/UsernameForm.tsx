import { useForm } from 'react-hook-form'

import { useUsersStore } from '../../../store'

import { TextField, Button, Box } from '@mui/material'

export const UsernameForm = () => {
    const { register, handleSubmit } = useForm()
    const usersStore = useUsersStore()

    const onSubmit = handleSubmit((data) => {
        const id = usersStore.users.filter(u => u.isLoggedIn === true)[0].id
        usersStore.addUsername(id, data.username)
    })

    return (
        <Box sx={{ width: '300px' }}>
            <form onSubmit={onSubmit}>
                <TextField
                    sx={{
                        margin: 1
                    }}
                    variant={'standard'}
                    fullWidth
                    {...register('username')}
                />
                <Button variant={'contained'} type={'submit'}>
                    {'Save'}
                </Button>
            </form>
        </Box>
    )
}

export default UsernameForm