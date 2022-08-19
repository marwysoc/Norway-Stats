import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Box, TextField, Button, Typography } from '@mui/material'
import { useUsersStore } from '../../store'


export const LoginForm = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const EMAIL_REQUIRED_ERROR = 'Email is required'
    const PASSWORD_REQUIRED_ERROR = 'Password is required'

    const { handleSubmit, register, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const usersStore = useUsersStore()

    const onRegisterClick = () => navigate('/register')

    const onSubmit = handleSubmit((data) => {
        if (usersStore.users.find(user => user.email === data.email && user.password === data.password) !== undefined) {
            setErrorMessage(null)
            usersStore.login(data.email, data.password)
            navigate('/')
        } else setErrorMessage('Invalid email or password')
    })

    return (
        <Box sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Typography variant={'h6'}>
                {'LOGIN'}
            </Typography>
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
                        error={errors.email ? true : false}
                        helperText={errors.email && errors.email.message}
                        {...register('email', {
                            required: {
                                value: true,
                                message: EMAIL_REQUIRED_ERROR,
                            }
                        })}
                    />
                    <TextField
                        sx={{ marginTop: 3, marginBottom: 3 }}
                        label={'Password'}
                        variant={'standard'}
                        type={'password'}
                        fullWidth
                        error={errors.password ? true : false}
                        helperText={errors.password && errors.password.message}
                        {...register('password', {
                            required: {
                                value: true,
                                message: PASSWORD_REQUIRED_ERROR,
                            }
                        })}
                    />
                    {
                        errorMessage ? <p style={{ color: 'red' }}>{errorMessage}</p> : null
                    }
                    <Button
                        variant={'contained'}
                        type={'submit'}>
                        {'LOGIN'}
                    </Button>
                    <Button
                        sx={{ marginTop: 2 }}
                        variant={'contained'}
                        color={'secondary'}
                        onClick={onRegisterClick}>
                        {'REGISTER'}
                    </Button>
                </Box>
            </form>
        </Box>
    )
}

export default LoginForm