import { Typography, Box } from '@mui/material'

import { useCommentToShow } from '../../../../hooks/'

interface Props {
    statId: any;
}

export const Comment = (props: Props) => {
    const commentToShow = useCommentToShow(props.statId)

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
            <Box sx={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Typography
                    data-cy={'field__comment'}
                    sx={{
                        paddingTop: 2
                    }}
                    component={'div'}
                >
                    {commentToShow?.comment}
                </Typography>
                <Typography
                    data-cy={'field__comment-owner'}
                    component={'div'}
                    variant={'subtitle2'}
                >
                    {`comment added by: ${commentToShow?.commentOwner}`}
                </Typography>
            </Box>
        </Box>
    )
}

export default Comment