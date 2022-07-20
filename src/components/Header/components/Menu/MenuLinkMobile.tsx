import { ListItem, ListItemButton, ListItemText } from '@mui/material'

import { MenuLinkProps } from '../../'

export const MenuLinkMobile: React.FC<MenuLinkProps> = (props) => {
    return (
        <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} href={props.linkTo}>
                <ListItemText primary={props.linkTxt} />
            </ListItemButton>
        </ListItem>
    )
}

export default MenuLinkMobile