import { useForm } from 'react-hook-form'

import { Button, Box, TextField } from '@mui/material'

import { useSavedStatsStore } from '../../../../store'
import { useLoggedInUser, useCommentToShow } from '../../../../hooks'
import { CommentData } from '../../../../store/saveStatStore';

interface Props {
    statId: any;
}

export const CommentForm = (props: Props) => {
    const savedStatsStore = useSavedStatsStore()
    const loggedInUser = useLoggedInUser()

    const commentToShow = useCommentToShow(props.statId)

    const { register, formState: { isDirty }, handleSubmit } = useForm({
        defaultValues: {
            comment: commentToShow?.comment
        }
    })

    const onSubmit = handleSubmit((data) => {
        savedStatsStore.addStatComment(
            props.statId,
            {
                comment: data.comment,
                commentOwner: loggedInUser?.username ? loggedInUser.username : loggedInUser?.email
            } as CommentData)
    })

    return (
        <Box
            sx={{
                width: '100%',
                margin: 1.5,
            }}
        >
            <form onSubmit={onSubmit}>
                <TextField
                    data-cy={'input__comment'}
                    sx={{
                        margin: 1
                    }}
                    multiline
                    maxRows={10}
                    variant={'standard'}
                    fullWidth
                    {...register('comment')}
                />
                <Button
                    data-cy={'button__comment-submit'}
                    sx={{
                        margin: 1,
                        width: '100%'
                    }}
                    disabled={!isDirty}
                    variant={'contained'}
                    color={'primary'}
                    type={'submit'}
                >
                    SAVE
                </Button>
            </form>
        </Box>
    )
}

export default CommentForm