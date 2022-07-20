import Button from '@mui/material/Button'

import { MenuLinkProps } from '../../'

export const MenuLinkMobile: React.FC<MenuLinkProps> = (props) => {
    return (
        <Button sx={{ color: '#fff' }} href={props.linkTo}>
            {props.linkTxt}
        </Button>
    )
}

export default MenuLinkMobile