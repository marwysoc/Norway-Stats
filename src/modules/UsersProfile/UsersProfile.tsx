import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUsersStore } from '../../store'

import { Box, Button, Typography } from '@mui/material'
import UsernameForm from './components/UsernameForm'
import { BasicModal } from '../../components/UI'

import { useLoggedInUser } from '../../hooks'

export const UsersProfile = () => {
    const navigate = useNavigate()
    const usersStore = useUsersStore()

    const loggedInUser = useLoggedInUser()

    useEffect(() => {
        if (loggedInUser === null) navigate('/login')
    }, [loggedInUser, navigate])

    const onLogoutClick = () => {
        usersStore.logout()
    }

    return (
        <Box sx={{
            marginTop: '100px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Typography variant={'h6'}>
                {'Profile'}
            </Typography>
            {
                loggedInUser && (
                    <>
                        <Typography sx={{ marginBottom: 1, marginTop: 2 }}>
                            <span style={{ fontWeight: 'bold', marginRight: 2 }}>{'E-mail: '}</span>
                            {loggedInUser.email}
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Typography>
                                <span style={{ fontWeight: 'bold', marginRight: 2 }}>{'Username: '}</span>
                                {loggedInUser.username ? loggedInUser.username : '-'}
                            </Typography>
                            <BasicModal
                                buttonLabel={'Edit'}
                                modalBody={
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <Typography variant={'subtitle1'}>
                                            {'Edit username'}
                                        </Typography>
                                        <UsernameForm />
                                    </Box>
                                }
                            />
                        </Box>
                    </>
                )
            }
            <Button variant={'contained'} onClick={onLogoutClick}>
                {'Logout'}
            </Button>
        </Box>

    )
}

export default UsersProfile