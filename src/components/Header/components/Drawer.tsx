import { Typography, Drawer, Divider, Box } from '@mui/material'

import { Menu } from './Menu'

import { DrawerProps } from '../'

const drawerWidth = 240

export const DrawerBar: React.FC<DrawerProps> = (props) => {
    const drawer = (
        <Box onClick={props.handleToggle} sx={{ textAlign: 'center' }}>
            <Typography variant='h6' sx={{ my: 2 }}>
                Norway Stats
            </Typography>
            <Divider />
            <Menu isMobile={true}/>
        </Box>
    );

    return (
        <Box component='nav'>
            <Drawer
                variant='temporary'
                open={props.isOpen}
                onClose={props.handleToggle}
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
    );
}

export default DrawerBar
