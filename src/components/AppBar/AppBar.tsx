import { useState } from 'react'
import { Toolbar, Typography, List, IconButton, Drawer, Divider, Box, AppBar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import MenuLinkMobile from '../MenuLinkMobile/MenuLinkMobile'
import MenuLink from '../MenuLink/MenuLink'

const drawerWidth = 240

export const  DrawerAppBar: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant='h6' sx={{ my: 2 }}>
                Norway Stats
            </Typography>
            <Divider />
            <List>
                <MenuLinkMobile linkTxt={'Home'} linkTo={'/'} />
                <MenuLinkMobile linkTxt={'Library'} linkTo={'/lib'} />
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component='nav' color={'primary'}>
                <Toolbar>
                    <IconButton
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
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <MenuLink linkTxt={'Home'} linkTo={'/'} />
                        <MenuLink linkTxt={'Library'} linkTo={'/lib'} />
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component='nav'>
                <Drawer
                    variant='temporary'
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

export default DrawerAppBar
