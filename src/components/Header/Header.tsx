import { useState } from 'react'

import { Toolbar, Typography, IconButton, Box, AppBar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import { Menu } from './components/Menu'
import { DrawerBar } from './components/Drawer'

export const Header: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);

    const handleDrawerToggle: () => void = () => {
        setMobileOpen(!mobileOpen)
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component='nav' color={'primary'}>
                <Toolbar>
                    <IconButton
                        data-cy={'button__open-drawer'}
                        color='inherit'
                        aria-label='open drawer'
                        edge='start'
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Norway Stats
                    </Typography>
                    <Menu isMobile={false} />
                </Toolbar>
            </AppBar>
            <Box component='nav'>
                <DrawerBar isOpen={mobileOpen} handleToggle={handleDrawerToggle} />
            </Box>
        </Box>
    );
}

export default Header
