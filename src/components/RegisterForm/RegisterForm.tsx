import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Box, TextField, Button, Typography } from '@mui/material'
import { useUsersStore } from '../../store'

import { v4 as uuidv4 } from 'uuid'

export const RegisterForm = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const EMAIL_REQUIRED_ERROR = 'Email is required'
    const PASSWORD_REQUIRED_ERROR = 'Password is required'
    const REPEAT_PASSWORD_VALIDATION_ERROR = 'Passwords must be the same'

    const { handleSubmit, register, formState: { errors }, watch } = useForm()
    const password = watch('password')

    const navigate = useNavigate()
    const usersStore = useUsersStore()

    const onBackToLoginClick = () => navigate('/login')

    const onSubmit = handleSubmit((data) => {
        if (usersStore.users.find(user => user.email === data.email) === undefined) {
            usersStore.addNewUser({
                id: uuidv4(),
                email: data.email,
                password: data.password,
                isLoggedIn: true
            })
            navigate('/profile')
        } else setErrorMessage(`User with email ${data.email} already exists, try to login`)
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
                {'REGISTER'}
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
                        sx={{ marginTop: 3 }}
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
                    <TextField
                        sx={{ marginTop: 3, marginBottom: 3 }}
                        label={'Reapeat password'}
                        variant={'standard'}
                        type={'password'}
                        fullWidth
                        error={errors.repeatPassword ? true : false}
                        helperText={errors.repeatPassword && errors.repeatPassword.message}
                        {...register('repeatPassword', {
                            required: {
                                value: true,
                                message: PASSWORD_REQUIRED_ERROR,
                            },
                            validate: (repeatPassword) => repeatPassword === password || REPEAT_PASSWORD_VALIDATION_ERROR
                        })}
                    />
                    {
                        errorMessage ? <p style={{ color: 'red' }}>{errorMessage}</p> : null
                    }
                    <Button
                        variant={'contained'}
                        type={'submit'}>
                        {'REGISTER'}
                    </Button>
                    <Button
                        sx={{ marginTop: 2 }}
                        variant={'contained'}
                        color={'secondary'}
                        onClick={onBackToLoginClick}>
                        {'BACK TO LOGIN'}
                    </Button>

                </Box>
            </form>
        </Box>
    )
}

export default RegisterForm