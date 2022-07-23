import { Box, Typography, Button } from '@mui/material'

interface ErrorProps {
    errorMessage: string;
    onButtonClick: () => void;
    buttonLabel: string;
}

export const Error: React.FC<ErrorProps> = (props) => {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: '0',
                left: '0',
                zIndex: '9999',
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                <Typography>{props.errorMessage}</Typography>
                <Button
                    onClick={props.onButtonClick}
                    variant={'contained'}
                    color={'primary'}
                    sx={{
                        marginTop: 1
                    }}
                >
                    {props.buttonLabel}
                </Button>
            </Box>
        </Box>
    )
}

export default Error