import { Typography, Box, Button } from '@mui/material'

interface CommentProps {
    onEditBtnClick: any;
    comment: string;
}

export const Comment: React.FC<CommentProps> = (props) => {

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 2
            }}
        >
            <Typography
                sx={{
                    padding: 2
                }}
                component={'div'}
            >
                {props.comment}
            </Typography>
            {
                props.comment && (
                    <Button
                        variant={'contained'}
                        onClick={props.onEditBtnClick}
                    >
                        Edit
                    </Button>
                )}
        </Box>

    )
}

export default Comment