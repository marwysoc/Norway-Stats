import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

interface LinkMobileProps {
    linkTo: string;
    linkTxt: string;
}

export const MenuLinkMobile: React.FC<LinkMobileProps> = (props) => {
    return (
        <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} href={props.linkTo}>
                <ListItemText primary={props.linkTxt} />
            </ListItemButton>
        </ListItem>
    )
}

export default MenuLinkMobile