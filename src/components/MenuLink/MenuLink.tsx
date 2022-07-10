import Button from '@mui/material/Button'

interface LinkProps {
    linkTo: string;
    linkTxt: string;
}

export const MenuLinkMobile: React.FC<LinkProps> = (props) => {
    return (
        <Button sx={{ color: '#fff' }} href={props.linkTo}>
            {props.linkTxt}
        </Button>
    )
}

export default MenuLinkMobile