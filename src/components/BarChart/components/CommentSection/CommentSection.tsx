import { useState } from 'react'

import { Box, Button } from '@mui/material'
import { CommentForm } from './CommentForm'
import { Comment } from '../CommentSection'

import { CommentSectionProps } from '../../'

import { useCommentToShow, useLoggedInUser } from '../../../../hooks'

export const CommentSection: React.FC<CommentSectionProps> = (props) => {
    const commentToShow = useCommentToShow(props.id)
    const loggedInUser = useLoggedInUser()

    const [showForm, setShowForm] = useState<boolean>(false)
    const [showComment, setShowComment] = useState<boolean>(false)
    const [txtCommentBtn, setTxtCommentBtn] = useState<string>(() => commentToShow ? 'Show Comment' : 'Add comment')

    const onEditHandler: () => void = () => {
        setShowForm(true)
        setShowComment(false)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '70%'
            }}>
            {
                txtCommentBtn === 'Add comment' && !loggedInUser ? null : (
                    <Button
                        variant={'outlined'}
                        color={'primary'}
                        disabled={showForm ? true : false}
                        onClick={() => {
                            setShowForm(() => commentToShow?.comment ? false : true)
                            setTxtCommentBtn(() => !showComment ? 'Hide Comment' : 'Show comment')
                            txtCommentBtn === 'Add comment' ? setShowComment(false) : setShowComment(!showComment)
                        }}
                    >
                        {txtCommentBtn}
                    </Button>
                )
            }
            {
                showForm && loggedInUser && (
                    <CommentForm statId={props.id} />
                )
            }
            {
                showComment && (
                    <>
                        <Comment statId={props.id} />
                        {loggedInUser && <Button variant={'contained'} size={'small'} onClick={onEditHandler}>{'Edit comment'}</Button>}
                    </>
                )
            }
        </Box>
    )
}

export default CommentSection