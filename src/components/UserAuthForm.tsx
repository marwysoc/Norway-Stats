import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Box, TextField, Button, Typography } from '@mui/material'
import { useUsersStore } from '../store'

import { v4 as uuidv4 } from 'uuid'

interface Props {
    submitButtonTxt: string;
}

export const UserAuthForm = (props: Props) => {
    const { handleSubmit, register } = useForm()
    const navigate = useNavigate()
    const usersStore = useUsersStore()

    const onRegisterClick = () => navigate('/register')
    const onBackToLoginClick = () => navigate('/login')

    const onSubmit = handleSubmit((data) => {
        if (props.submitButtonTxt === 'LOGIN') {
            usersStore.login(data.email, data.password)
            navigate('/')
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