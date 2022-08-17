import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Box, TextField, Button, Typography } from '@mui/material'
import { useUsersStore } from '../store'

import { v4 as uuidv4 } from 'uuid'

interface Props {
    submitButtonTxt: string;
}

export const UserAuthForm = (props: Props) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const VALUE_REQUIRED_ERROR = 'This Value is required'

    const { handleSubmit, register, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const usersStore = useUsersStore()

    const onRegisterClick = () => navigate('/register')
    const onBackToLoginClick = () => navigate('/login')

    const onSubmit = handleSubmit((data) => {
        if (props.submitButtonTxt === 'LOGIN') {
            if (usersStore.users.find(user => user.email === data.email && user.password === data.password) !== undefined) {
                setErrorMessage(null)
                usersStore.login(data.email, data.password)
                navigate('/')
            } else setErrorMessage('Invalid email or password')
        }
        if (props.submitButtonTxt === 'REGISTER') {
            usersStore.addNewUser({
                id: uuidv4(),
                email: data.email,
                password: data.password,
                isLoggedIn: true
            })
            navigate('/profile')
        }
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
                {props.submitButtonTxt === 'LOGIN' ? 'LOGIN' : 'REGISTER'}
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
                                message: VALUE_REQUIRED_ERROR,
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
                                message: VALUE_REQUIRED_ERROR,
                            }
                        })}
                    />
                    {
                        errorMessage ? <p style={{ color: 'red' }}>{errorMessage}</p> : null
                    }
                    <Button
                        variant={'contained'}
                        type={'submit'}>
                        {props.submitButtonTxt}
                    </Button>
                    {
                        props.submitButtonTxt === 'LOGIN' && <Button
                            sx={{ marginTop: 2 }}
                            variant={'contained'}
                            color={'secondary'}
                            onClick={onRegisterClick}>
                            {'REGISTER'}
                        </Button>
                    }
                    {
                        props.submitButtonTxt === 'REGISTER' && <Button
                            sx={{ marginTop: 2 }}
                            variant={'contained'}
                            color={'secondary'}
                            onClick={onBackToLoginClick}>
                            {'BACK TO LOGIN'}
                        </Button>
                    }
                </Box>
            </form>
        </Box>
    )
}

export default UserAuthForm