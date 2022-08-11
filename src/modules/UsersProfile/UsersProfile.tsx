import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUsersStore } from '../../store'

import { Box, Typography } from '@mui/material'
import UsernameForm from './components/UsernameForm'
import { BasicModal } from '../../components/UI'

export const UsersProfile = () => {
    const navigate = useNavigate()
    const usersStore = useUsersStore()

    const loggedInUser = usersStore.users.filter(u => u.isLoggedIn === true)

    useEffect(() => {
        loggedInUser.length === 0 && navigate('/login')
    }, [])

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
            <Typography sx={{ marginBottom: 1, marginTop: 2 }}>
                <span style={{ fontWeight: 'bold', marginRight: 2 }}>{'E-mail: '}</span>
                {loggedInUser[0].email}
            </Typography>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Typography>
                    <span style={{ fontWeight: 'bold', marginRight: 2 }}>{'Username: '}</span>
                    {loggedInUser[0].username ? loggedInUser[0].username : '-'}
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
        </Box>

    )
}

export default UsersProfile