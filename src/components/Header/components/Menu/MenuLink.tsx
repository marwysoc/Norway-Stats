import Button from '@mui/material/Button'

import { MenuLinkProps } from '../../'

export const MenuLinkMobile: React.FC<MenuLinkProps> = (props) => {
    return (
        <Button data-cy={'desktop-menu-link'} sx={{ color: '#fff' }} href={props.linkTo}>
            {props.linkTxt}
        </Button>
    )
}

export default MenuLinkMobile