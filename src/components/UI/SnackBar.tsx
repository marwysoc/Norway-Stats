import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

interface SnackBarProps {
    isOpen: boolean;
    message: string;
}

export const SnackBar: React.FC<SnackBarProps> = (props) => {

    return (
        <div>
            <Snackbar
                open={props.isOpen}
                autoHideDuration={6000}
            >
                <MuiAlert
                    elevation={6}
                    variant='filled'
                    severity='success'
                    sx={{ width: '200px' }}
                >
                    {props.message}
                </MuiAlert>
            </Snackbar>
        </div>
    );
}

export default SnackBar
