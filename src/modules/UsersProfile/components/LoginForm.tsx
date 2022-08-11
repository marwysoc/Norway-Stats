import { useForm } from 'react-hook-form'

import { Box, TextField, Button } from '@mui/material'

import { useUsersStore } from '../../../store'

export const LoginForm = () => {
    const { handleSubmit, register } = useForm()
    const usersStore = useUsersStore()

    const onSubmit = handleSubmit((data) => {
        usersStore.login(data.email, data.password)
    })

    return (
        <Box sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <form onSubmit={onSubmit}>
                <Box
                    sx={{
                        width: '300px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                    <TextField
                        label={'E-mail'}
                        variant={'standard'}
                        fullWidth
                        {...register('email')}
                    />
                    <TextField
                        sx={{ marginTop: 3, marginBottom: 3 }}
                        label={'Password'}
                        variant={'standard'}
                        type={'password'}
                        fullWidth
                        {...register('password')}
                    />
                    <Button
                        variant={'contained'}
                        type={"submit"}>
                        {'LOGIN'}
                    </Button>
                </Box>
            </form>
        </Box>
    )
}

export default LoginForm