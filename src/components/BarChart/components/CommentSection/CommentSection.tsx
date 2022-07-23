import { useState, useEffect } from 'react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'

import { Box, Button } from '@mui/material'
import { CommentForm, Comment } from '../CommentSection'

import { SavedStat, CommentSectionProps, CommentFormValues } from '../../'

export const CommentSection: React.FC<CommentSectionProps> = (props) => {
    const [comment, setComment] = useState<string>(props.comment!)
    const [showForm, setShowForm] = useState<boolean>(false)
    const [showComment, setShowComment] = useState<boolean>(false)
    const [txtCommentBtn, setTxtCommentBtn] = useState<string>(() => comment ? 'Show Comment' : 'Add comment')

    const savedStats: SavedStat[] = JSON.parse(localStorage.getItem('savedStats') || '[]') || []

    const methods = useForm<CommentFormValues>({
        defaultValues: {
            comment: comment
        }
    })
    const { handleSubmit } = methods

    useEffect(() => {
        const index = savedStats.findIndex(
            (singleStat) => singleStat.id === props.id
        )
        savedStats[index].comment = comment
        localStorage.setItem('savedStats', JSON.stringify(savedStats))
    }, [comment, props, savedStats])

    const onClickSubmit: SubmitHandler<CommentFormValues> = (data) => {
        if (data.comment) {
            setComment(data.comment)
            setShowForm(false)
            setShowComment(true)
        }
    }

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
            <Button
                variant={'outlined'}
                color={'primary'}
                disabled={showForm ? true : false}
                onClick={() => {
                    setShowForm(() => comment ? false : true)
                    setTxtCommentBtn(() => !showComment ? 'Hide Comment' : 'Show comment')
                    setShowComment(!showComment)
                }}
            >
                {txtCommentBtn}
            </Button>
            {
                showForm && (
                    <FormProvider
                        {...methods}
                    >
                        <CommentForm
                            onSubmit={handleSubmit((data) => onClickSubmit(data))}
                        />
                    </FormProvider>
                )
            }
            {
                showComment && (
                    <Comment
                        comment={comment}
                        onEditBtnClick={onEditHandler}
                    />
                )
            }
        </Box>
    )
}

export default CommentSection