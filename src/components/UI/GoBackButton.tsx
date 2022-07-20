import { Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

interface GoBackButtonProps {
    onClickGoBack: any;
    label: string;
    sx: any;
}

export const GoBackButton: React.FC<GoBackButtonProps> = (props) => {
    return (
        <Button
            sx={props.sx}
            variant="text"
            startIcon={<ArrowBackIcon />}
            onClick={props.onClickGoBack}
        >
            {props.label}
        </Button>
    )
}

export default GoBackButton