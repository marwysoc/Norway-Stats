import { List, Box } from '@mui/material'

import { MenuLink, MenuLinkMobile } from '.'

import { MenuProps } from '../../'

export const Menu: React.FC<MenuProps> = (props) => {
    return (
        props.isMobile ? (
            <List>
                <MenuLinkMobile linkTxt={'Home'} linkTo={'/'} />
                <MenuLinkMobile linkTxt={'Library'} linkTo={'/lib'} />
            </List>
        ) : (
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <MenuLink linkTxt={'Home'} linkTo={'/'} />
                <MenuLink linkTxt={'Library'} linkTo={'/lib'} />
            </Box>
        )
    )
}

export default Menu